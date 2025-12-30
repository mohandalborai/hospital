<?php
use App\Services\AiAnalysisService;
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$service = new AiAnalysisService();
echo $service->analyze('test_image.jpg');
