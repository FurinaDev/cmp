<?php
/**
 * Çağdaş Müzik Platformu - Gönüllü & Ekip Başvuru API (Hostinger Uyumlu)
 * /api/application.php
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

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

// JSON gövdesini veya standart form POST verisini al
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    $data = $_POST;
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$university = trim($data['university'] ?? '');
$department = trim($data['department'] ?? '');
$requestedUnit = trim($data['requestedUnit'] ?? ($data['unit'] ?? 'Genel'));
$notes = trim($data['notes'] ?? ($data['message'] ?? ''));

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'İsim ve e-posta adresinizi doldurmanız zorunludur.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Lütfen geçerli bir e-posta adresi giriniz.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/content.json';

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$existingData = [];
if (file_exists($dataFile)) {
    $jsonRaw = file_get_contents($dataFile);
    $existingData = json_decode($jsonRaw, true);
}

if (!is_array($existingData)) {
    $existingData = [];
}

if (!isset($existingData['applications']) || !is_array($existingData['applications'])) {
    $existingData['applications'] = [];
}

$newApplication = [
    'id' => 'app-' . time() . '-' . rand(100, 999),
    'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
    'email' => filter_var($email, FILTER_SANITIZE_EMAIL),
    'phone' => htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
    'university' => htmlspecialchars($university, ENT_QUOTES, 'UTF-8'),
    'department' => htmlspecialchars($department, ENT_QUOTES, 'UTF-8'),
    'requestedUnit' => htmlspecialchars($requestedUnit, ENT_QUOTES, 'UTF-8'),
    'status' => 'Yeni Başvuru',
    'notes' => htmlspecialchars($notes, ENT_QUOTES, 'UTF-8'),
    'date' => date('Y-m-d H:i')
];

// Yeni başvuruyu başa ekle (LIFO)
array_unshift($existingData['applications'], $newApplication);

$formatted = json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$result = file_put_contents($dataFile, $formatted, LOCK_EX);

if ($result === false) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Başvuru kaydedilemedi. Sunucu yazma yetkilerini kontrol ediniz.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Başvurunuz başarıyla alındı! Ekibimiz en kısa sürede sizinle iletişime geçecektir.',
    'applicationId' => $newApplication['id'],
    'date' => $newApplication['date']
], JSON_UNESCAPED_UNICODE);
