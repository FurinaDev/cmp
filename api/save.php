<?php
/**
 * Çağdaş Müzik Platformu - Veri Kaydetme API (Hostinger Uyumlu)
 * /api/save.php
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Preflight CORS isteğini onayla
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Sadece POST istekleri kabul edilir.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$rawInput = file_get_contents('php://input');

if (empty($rawInput)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Boş veri gönderildi.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$decoded = json_decode($rawInput, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($decoded)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Geçersiz JSON formatı: ' . json_last_error_msg()
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Dosya yolu ve dizin kontrolü
$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/content.json';

if (!is_dir($dataDir)) {
    if (!mkdir($dataDir, 0755, true)) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Veri klasörü (data/) oluşturulamadı. Sunucu dosya izinlerini kontrol ediniz.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// Temiz ve okunaklı JSON formatı
$formattedJson = json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

// Atomik ve kilitli dosya yazımı
$bytesWritten = file_put_contents($dataFile, $formattedJson, LOCK_EX);

if ($bytesWritten === false) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Dosya yazılamadı. Lütfen data/ klasörünün yazma yetkisini (CHMOD 755 veya 775) kontrol ediniz.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Veriler başarıyla kaydedildi.',
    'bytes' => $bytesWritten,
    'updated_at' => date('Y-m-d H:i:s')
], JSON_UNESCAPED_UNICODE);
