<?php
// CORS-Header hinzufügen, um die API von anderen Domains zugänglich zu machen
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require 'hikiju_open_information_db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Sprache aus dem Parameter abrufen (Standard: alle Sprachen)
    $lang = $_GET['lang'] ?? null;
    
    // Tags aus dem Parameter abrufen
    $tags = isset($_GET['tags']) ? explode(',', $_GET['tags']) : [];

    // Fetch questions data
    $sql = "SELECT name, translations_content, tags, translations_name FROM organizations";
    $stmt = $pdo->query($sql);

    // Fetch all rows as an associative array
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Process the data
    $filteredData = [];
    foreach ($data as $row) {
        // Cast boolean-like fields to proper boolean types
        if (isset($row['managed_by_official'])) {
            $row['managed_by_official'] = (bool) $row['managed_by_official'];
        }
        if (isset($row['delete_request_sent'])) {
            $row['delete_request_sent'] = (bool) $row['delete_request_sent'];
        }

        // Tags verarbeiten
        if (isset($row['tags'])) {
            $row['tags'] = json_decode($row['tags']);
        }

        // Filter nach Tags
        if (!empty($tags) && !array_intersect($tags, $row['tags'])) {
            continue; // Überspringen, wenn keine Übereinstimmung gefunden wurde
        }

        // Sprache verarbeiten
        if ($lang === null) {
            // Alle Sprachen zurückgeben
            if (isset($row['translations_name'])) {
                $row['translations_name'] = json_decode(preg_replace('/\s+/', ' ', $row['translations_name']));
            }
            if (isset($row['translations_content'])) {
                $row['translations_content'] = json_decode(preg_replace('/\s+/', ' ', $row['translations_content']));
            }
        } else {
            // Übersetzungsdaten filtern nach Sprache
            if (isset($row['translations_name'])) {
                $translations_name = json_decode($row['translations_name'], true);
                $row['translations_name'] = $translations_name[$lang] ?? null; // Nur die angeforderte Sprache zurückgeben
            }

            if (isset($row['translations_content'])) {
                $translations_content = json_decode($row['translations_content'], true);
                $row['translations_content'] = $translations_content[$lang] ?? null; // Nur die angeforderte Sprache zurückgeben
            }
        }

        // Nur gefilterte Daten hinzufügen
        $filteredData[] = $row;
    }

    // Output data as JSON
    echo json_encode($filteredData);
}
?>
