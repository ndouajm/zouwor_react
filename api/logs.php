<?php
$dataFile = __DIR__ . '/data/database.json';

function readDB() {
    global $dataFile;
    if (!file_exists($dataFile)) {
        return ['logs' => []];
    }
    return json_decode(file_get_contents($dataFile), true);
}

$db = readDB();
$logs = array_slice($db['logs'] ?? [], -100);
echo json_encode($logs);
?>