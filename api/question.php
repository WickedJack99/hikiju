<?php
// CORS-Header hinzufügen, um die API von anderen Domains zugänglich zu machen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require 'hikiju_open_information_db_connection.php';

// Get the URL path and parse it
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Check if the request matches the endpoint pattern
if (preg_match('#^/question/([^/]+)$#', $request_uri, $matches)) {
    $name = $matches[1];

    // Fetch data from the database
    $sql = "SELECT * FROM questions WHERE name = :name";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['name' => $name]);

    // Fetch the data
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
  
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
    }
    // Output the data as JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    // Handle other routes or invalid requests
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
?>
