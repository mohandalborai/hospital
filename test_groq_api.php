<?php
use App\Services\AiAnalysisService;
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$service = new AiAnalysisService();
echo "Testing Groq API...\n";
try {
    $result = $service->analyze('test_groq.png');
    echo "Result:\n";
    echo $result;
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}
