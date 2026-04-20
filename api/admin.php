<?php
$input = json_decode(file_get_contents('php://input'), true);
$password = $input['password'] ?? '';

if ($password === 'zouwor2025') {
    echo json_encode(['success' => true, 'token' => 'admin-token-' . time()]);
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Mot de passe incorrect']);
}
?>