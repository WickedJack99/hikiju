<?php
// CORS-Header hinzufügen, um die API von anderen Domains zugänglich zu machen
header("Access-Control-Allow-Origin: *"); // * für alle Domains (oder setze eine spezifische URL, z.B. 'https://deine-website.com')
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Erlaubte HTTP-Methoden
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Erlaubte Header

require 'hikiju_open_information_db_connection.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $is_first = isset($_GET['is_first']) ? strtolower($_GET['is_first']) : null;

    if ($is_first === 'true') {
        $is_first = 1; // Convert "true" to 1
    } elseif ($is_first === 'false') {
        $is_first = 0; // Convert "false" to 0
    } else {
        $is_first = null; // Treat invalid or missing values as null
    }
    
    $sql = "SELECT * FROM questions";
    $stmt = null;
    
    if ($is_first !== null) {
        $sql = "SELECT * FROM questions WHERE is_first = :is_first";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['is_first' => $is_first]);
    } else {
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    }

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
        if (isset($row['tags'])) {
            $row['tags'] = json_decode(preg_replace('/\s+/', ' ', $row['tags']));
        }
    }

    // Output data as JSON
    echo json_encode($data);
}
?>
