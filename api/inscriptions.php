<?php
$dataFile = __DIR__ . '/data/database.json';

function readDB() {
    global $dataFile;
    if (!file_exists($dataFile)) {
        return ['inscriptions' => [], 'stats' => ['total_inscriptions' => 0, 'daily_stats' => []]];
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
    echo json_encode($db['inscriptions']);
}
elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $newInscription = [
        'id' => time() . '-' . bin2hex(random_bytes(5)),
        'source' => $input['source'] ?? '',
        'motivation' => $input['motivation'] ?? '',
        'import' => $input['import'] ?? '',
        'types' => $input['types'] ?? [],
        'produits' => $input['produits'] ?? '',
        'budget' => $input['budget'] ?? '',
        'sexe' => $input['sexe'] ?? '',
        'commune' => $input['commune'] ?? '',
        'whatsapp' => $input['whatsapp'] ?? '',
        'date_inscription' => date('c'),
        'status' => 'pending'
    ];
    
    $db = readDB();
    $db['inscriptions'][] = $newInscription;
    $db['stats']['total_inscriptions'] = ($db['stats']['total_inscriptions'] ?? 0) + 1;
    
    $today = date('Y-m-d');
    if (!isset($db['stats']['daily_stats'][$today])) {
        $db['stats']['daily_stats'][$today] = ['visits' => 0, 'inscriptions' => 0, 'newsletter' => 0];
    }
    $db['stats']['daily_stats'][$today]['inscriptions']++;
    
    writeDB($db);
    
    echo json_encode(['success' => true, 'message' => 'Inscription enregistrée', 'data' => $newInscription]);
}
?>