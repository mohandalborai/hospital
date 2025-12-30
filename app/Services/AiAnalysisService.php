<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class AiAnalysisService
{
    protected $apiKey;
    protected $baseUrl = 'https://api.groq.com/openai/v1/chat/completions';

    public function __construct()
    {
        $this->apiKey = env('GROQ_API_KEY');
    }

    public function analyze($filePath)
    {
        if (empty($this->apiKey)) {
            Log::error('GROQ_API_KEY is missing.');
            return $this->getMockData('GROQ_API_KEY is missing');
        }

        if (!Storage::disk('public')->exists($filePath)) {
            Log::error("File not found for Groq analysis: " . $filePath);
            return $this->getMockData('File not found');
        }

        try {
            $fullPath = Storage::disk('public')->path($filePath);
            $imageData = file_get_contents($fullPath);
            $base64Image = base64_encode($imageData);
            $mimeType = mime_content_type($fullPath) ?: 'image/jpeg';

            Log::info("Image Info: Mime: $mimeType, Base64 Length: " . strlen($base64Image));
            Log::info("Starting Groq analysis for file: $filePath with model meta-llama/llama-4-scout-17b-16e-instruct");

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl, [
                'model' => 'meta-llama/llama-4-scout-17b-16e-instruct',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => [
                            [
                                'type' => 'text',
                                'text' => "Analyze this medical image. Return a valid JSON object with the following keys:\n- 'label': A short condition name or 'Normal'.\n- 'score': A confidence score between 0.0 and 1.0.\n- 'findings': An array of strings describing observations.\n\nEnsure the response is strictly valid JSON without any markdown formatting, backticks, or extra text.",
                            ],
                            [
                                'type' => 'image_url',
                                'image_url' => [
                                    'url' => "data:$mimeType;base64,$base64Image",
                                ],
                            ],
                        ],
                    ],
                ],
                'temperature' => 0.1,
                'max_tokens' => 1024,
                'top_p' => 1,
                'stream' => false,
                'stop' => null,
            ]);

            if ($response->failed()) {
                Log::error('Groq API Error Status: ' . $response->status());
                Log::error('Groq API Error Body: ' . $response->body());
                throw new \Exception('Groq API Error: ' . $response->body());
            }

            $content = $response->json('choices.0.message.content');
            Log::info("Groq Raw Response: " . $content);

            // Clean content if it contains markdown code blocks
            $content = $this->cleanJsonString($content);

            $data = json_decode($content, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('JSON Decode Error: ' . json_last_error_msg());
                throw new \Exception('Failed to decode JSON from Groq response');
            }

            $label = $data['label'] ?? 'Unknown';
            $score = $data['score'] ?? 0;
            $findings = $data['findings'] ?? ['Analysis completed'];

            // Ensure findings is array
            if (!is_array($findings)) {
                $findings = [$findings];
            }

            return json_encode([
                'analyzed_at' => now(),
                'findings' => array_merge(["Condition: $label"], $findings),
                'confidence_score' => $score,
                'summary' => 'AI Analysis (Groq): ' . $label
            ]);

        } catch (\Exception $e) {
            Log::error('Groq Analysis Failed: ' . $e->getMessage());
            return $this->getMockData('Groq Failed: ' . $e->getMessage());
        }
    }

    protected function cleanJsonString($string)
    {
        // Remove markdown code blocks if present
        $string = preg_replace('/^```json\s*/i', '', $string);
        $string = preg_replace('/^```\s*/i', '', $string);
        $string = preg_replace('/\s*```$/', '', $string);
        return trim($string);
    }

    protected function getMockData($message = null)
    {
        return json_encode([
            'analyzed_at' => now(),
            'findings' => [
                'Logic: Groq Analysis could not be completed.',
                'Using fallback/mock data system.',
                $message ?? 'Unknown error'
            ],
            'confidence_score' => 0,
            'summary' => 'Mock analysis (System Error)'
        ]);
    }
}
