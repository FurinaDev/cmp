<?php
/**
 * Çağdaş Müzik Platformu - Veri Okuma API (Hostinger Uyumlu)
 * /api/data.php
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/../data/content.json';

if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    if ($content !== false) {
        echo $content;
        exit;
    }
}

// Dosya yoksa veya okunamadıysa varsayılan boş şablon döndür
echo json_encode([
    'settings' => [
        'noticeBar' => ['enabled' => true, 'text' => 'Çağdaş Müzik Platformu', 'link' => '#'],
        'heroHeadline' => 'Türkiye\'nin Çağdaş Müzik ve Ses Sanatı İnisiyatifi',
        'heroSubhead' => 'Besteciler, icracılar, araştırmacılar ve dinleyiciler için ortak platform.',
        'contactEmail' => 'info@cagdasmuzik.net',
        'pressEmail' => 'basin@cagdasmuzik.net',
        'phone' => '+90 212 000 00 00',
        'address' => 'İstanbul, Türkiye',
        'socialLinks' => []
    ],
    'events' => [],
    'blogs' => [],
    'team' => [],
    'archive' => [],
    'applications' => []
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
