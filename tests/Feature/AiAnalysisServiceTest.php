<?php

namespace Tests\Feature;

use App\Services\AiAnalysisService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AiAnalysisServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_analyze_returns_mock_data_when_api_key_missing()
    {
        // Ensure no API key
        putenv('HF_API_KEY=');

        $service = new AiAnalysisService();
        $result = $service->analyze('dummy/path.jpg');

        $this->assertTrue(str_contains($result, 'HF_API_KEY missing'));
    }

    public function test_analyze_makes_api_request_and_returns_result()
    {
        // Set fake API key
        putenv('HF_API_KEY=fake_key');

        // Fake the HTTP response
        Http::fake([
            'https://router.huggingface.co/hf-inference/models/google/vit-base-patch16-224' => Http::response([
                ['label' => 'cat', 'score' => 0.9]
            ], 200)
        ]);

        // Fake storage to avoid file not found
        Storage::fake('public');
        Storage::disk('public')->put('dummy/path.jpg', 'fake content');

        $service = new AiAnalysisService();
        $result = $service->analyze('dummy/path.jpg');

        $data = json_decode($result, true);
        $this->assertEquals('AI analysis report: cat', $data['summary']);
        $this->assertEquals(0.9, $data['confidence_score']);
    }

    public function test_analyze_handles_api_failure()
    {
        putenv('HF_API_KEY=fake_key');

        Http::fake([
            'https://router.huggingface.co/hf-inference/models/google/vit-base-patch16-224' => Http::response('Error', 500)
        ]);

        Storage::fake('public');
        Storage::disk('public')->put('dummy/path.jpg', 'fake content');

        $service = new AiAnalysisService();
        $result = $service->analyze('dummy/path.jpg');

        $this->assertTrue(str_contains($result, 'Failed:'));
    }

    public function test_analyze_handles_file_not_found()
    {
        putenv('HF_API_KEY=fake_key');

        $service = new AiAnalysisService();
        $result = $service->analyze('nonexistent.jpg');

        $this->assertTrue(str_contains($result, 'Failed:'));
    }
}