<?php
// CORS-Header hinzufügen, um die API von anderen Domains zugänglich zu machen
header("Access-Control-Allow-Origin: *"); // * für alle Domains (oder setze eine spezifische URL, z.B. 'https://deine-website.com')
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Erlaubte HTTP-Methoden
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Erlaubte Header

require 'hikiju_open_information_db_connection.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch questions data
    $sql = "SELECT * FROM translations";
    $stmt = $pdo->query($sql);

    // Fetch all rows as an associative array
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Process the data
    foreach ($data as &$row) {
        if (isset($row['translations'])) {
            $row['translations'] = json_decode(preg_replace('/\s+/', ' ', $row['translations']));
        }
    }

    // Output data as JSON
    echo json_encode($data);
}
?>
