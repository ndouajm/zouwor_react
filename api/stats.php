<?php
$dataFile = __DIR__ . '/data/database.json';

function readDB() {
    global $dataFile;
    if (!file_exists($dataFile)) {
        return ['stats' => ['total_visits' => 0, 'catalogue_downloads' => 0, 'daily_stats' => []]];
    }
    return json_decode(file_get_contents($dataFile), true);
}

function writeDB($data) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

if ($method === 'GET') {
    $db = readDB();
    echo json_encode($db['stats']);
}
elseif ($method === 'POST') {
    if (strpos($uri, '/stats/visit') !== false) {
        $db = readDB();
        $today = date('Y-m-d');
        
        $db['stats']['total_visits'] = ($db['stats']['total_visits'] ?? 0) + 1;
        
        if (!isset($db['stats']['daily_stats'][$today])) {
            $db['stats']['daily_stats'][$today] = ['visits' => 0, 'inscriptions' => 0, 'newsletter' => 0];
        }
        $db['stats']['daily_stats'][$today]['visits']++;
        
        writeDB($db);
        echo json_encode(['success' => true]);
    }
    elseif (strpos($uri, '/stats/downloads/catalogue') !== false) {
        $db = readDB();
        $db['stats']['catalogue_downloads'] = ($db['stats']['catalogue_downloads'] ?? 0) + 1;
        writeDB($db);
        echo json_encode(['success' => true, 'count' => $db['stats']['catalogue_downloads']]);
    }
}
?>