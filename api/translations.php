<?php
// CORS-Header hinzufügen, um die API von anderen Domains zugänglich zu machen
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

require 'hikiju_open_information_db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Sprache aus dem Parameter abrufen (Standard: alle Sprachen)
    $lang = $_GET['lang'] ?? null;
    
    $sql = "SELECT * FROM translations";
    $stmt = null;
    
    if ($lang !== null) {
        $sql = "SELECT * FROM translations WHERE lang = :lang";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['lang' => $lang]);
    } else {
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    }

    // Fetch the data
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Umwandlung der Daten in das i18next-kompatible Format
    $translations = [];

    foreach ($data as $row) {
        // Der Sprachcode
        $language = $row['lang'];
        
        // Der Schlüssel für die Übersetzung
        $key = $row['translation_key'];

        // Übersetzungsobjekt erstellen
        $entry = [
            'translation' => str_replace('"', '', $row['translation']) // Übersetzungswert direkt einsetzen
        ];
        
        // Füge organization_id hinzu, falls vorhanden
        if ($row['organization_id'] !== null) {
            $entry['organization_id'] = $row['organization_id'];
            $key = str_replace('organization_', '', $key);
        }

        // Füge question_id hinzu, falls vorhanden
        if ($row['question_id'] !== null) {
            $entry['question_id'] = $row['question_id'];
            $key = str_replace('question_', '', $key);
        }

        // Falls für die gegebene Sprache noch kein Array existiert, lege es an
        if (!isset($translations[$language])) {
            $translations[$language] = [];
        }

        // Übersetzung hinzufügen
        $translations[$language][$key] = $entry;
    }

    // Gib die umgewandelten Übersetzungen als JSON aus
    echo json_encode($translations);
}
?>