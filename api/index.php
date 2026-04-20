<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$request_uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Supprimer le préfixe /api/
$endpoint = str_replace('/api/', '', parse_url($request_uri, PHP_URL_PATH));

switch ($endpoint) {
    case 'health':
        echo json_encode(["status" => "OK", "message" => "Serveur Zouwor en ligne"]);
        break;
        
    case 'inscriptions':
        require_once __DIR__ . '/inscriptions.php';
        break;
        
    case 'newsletter':
        require_once __DIR__ . '/newsletter.php';
        break;
        
    case 'stats':
        require_once __DIR__ . '/stats.php';
        break;
        
    case 'logs':
        require_once __DIR__ . '/logs.php';
        break;
        
    case 'admin/login':
        require_once __DIR__ . '/admin.php';
        break;
        
    default:
        http_response_code(404);
        echo json_encode(["error" => "Endpoint non trouvé"]);
}
?>