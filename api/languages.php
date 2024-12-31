<?php
// CORS-Header hinzufügen, um die API von anderen Domains zugänglich zu machen
header("Access-Control-Allow-Origin: *"); // * für alle Domains (oder setze eine spezifische URL, z.B. 'https://deine-website.com')
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Erlaubte HTTP-Methoden
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Erlaubte Header

require 'hikiju_open_information_db_connection.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM languages";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    // Fetch all rows as an associative array
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output data as JSON
    echo json_encode($data);
}
?>
