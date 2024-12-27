<?php
require 'hikiju_simple_db_connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    // Validate input
    if (empty($username) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Username and password are required"]);
        exit;
    }

    // Fetch user data
    $stmt = $pdo->prepare("SELECT password_hash FROM users WHERE username = :username");
    $stmt->execute([':username' => $username]);
    $hash = $stmt->fetchColumn();

    if ($hash && password_verify($password, $hash)) {
        // Start a session for the logged-in user
        $_SESSION['username'] = $username;

        // Optionally generate a session token
        $token = base64_encode(random_bytes(32));
        $_SESSION['token'] = $token;

        echo json_encode(["success" => true, "message" => "Login successful", "token" => $token]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid username or password"]);
    }
}
?>
