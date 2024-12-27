<?php
// CORS-Header hinzufügen, um die API von anderen Domains zugänglich zu machen
header("Access-Control-Allow-Origin: *"); // * für alle Domains (oder setze eine spezifische URL, z.B. 'https://deine-website.com')
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Erlaubte HTTP-Methoden
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Erlaubte Header

require 'hikiju_open_information_db_connection.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch questions data
    $sql = "SELECT * FROM questions";
    $stmt = $pdo->query($sql);

    // Fetch all rows as an associative array
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Process the data
    foreach ($data as &$row) {
        // Cast boolean-like fields to proper boolean types
        if (isset($row['is_first'])) {
            $row['is_first'] = (bool) $row['is_first'];
        }
        if (isset($row['is_last'])) {
            $row['is_last'] = (bool) $row['is_last'];
        }
        if (isset($row['linked_questions'])) {
            $row['linked_questions'] = json_decode(preg_replace('/\s+/', ' ', $row['linked_questions']));
        }
        if (isset($row['translations'])) {
            $row['translations'] = json_decode(preg_replace('/\s+/', ' ', $row['translations']));
        }
        if (isset($row['tags'])) {
            $row['tags'] = json_decode(preg_replace('/\s+/', ' ', $row['tags']));
        }
    }

    // Output data as JSON
    echo json_encode($data);
}
?>
