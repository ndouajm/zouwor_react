<?php
// Chemin correct vers database.json
$dataFile = __DIR__ . '/data/database.json';

function readDB() {
    global $dataFile;
    if (!file_exists($dataFile)) {
        // Créer le dossier data s'il n'existe pas
        $dataDir = dirname($dataFile);
        if (!file_exists($dataDir)) {
            mkdir($dataDir, 0777, true);
        }
        return [
            'newsletter' => [], 
            'stats' => [
                'total_newsletter' => 0,
                'total_inscriptions' => 0,
                'total_visits' => 0,
                'catalogue_downloads' => 0,
                'daily_stats' => []
            ]
        ];
    }
    return json_decode(file_get_contents($dataFile), true);
}

function writeDB($data) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $db = readDB();
    echo json_encode($db['newsletter'] ?? []);
    exit();
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['email'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email requis']);
        exit();
    }
    
    $db = readDB();
    
    // Vérifier si email existe déjà
    foreach ($db['newsletter'] ?? [] as $sub) {
        if ($sub['email'] === $input['email']) {
            echo json_encode(['success' => false, 'message' => 'Email déjà inscrit']);
            exit();
        }
    }
    
    $newSubscriber = [
        'id' => time() . '-' . bin2hex(random_bytes(5)),
        'prenom' => $input['prenom'] ?? '',
        'email' => $input['email'],
        'whatsapp' => $input['whatsapp'] ?? null,
        'date_inscription' => date('c'),
        'status' => 'active'
    ];
    
    if (!isset($db['newsletter'])) $db['newsletter'] = [];
    $db['newsletter'][] = $newSubscriber;
    $db['stats']['total_newsletter'] = ($db['stats']['total_newsletter'] ?? 0) + 1;
    
    $today = date('Y-m-d');
    if (!isset($db['stats']['daily_stats'][$today])) {
        $db['stats']['daily_stats'][$today] = ['visits' => 0, 'inscriptions' => 0, 'newsletter' => 0];
    }
    $db['stats']['daily_stats'][$today]['newsletter']++;
    
    writeDB($db);
    
    echo json_encode(['success' => true, 'message' => 'Inscription newsletter réussie']);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
?>