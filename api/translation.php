<?php
// CORS-Header hinzufügen, um die API von anderen Domains zugänglich zu machen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require 'hikiju_open_information_db_connection.php';  // Deine Datenbankverbindung

// Überprüfen, ob die Sprachparameter vorhanden sind
if (isset($_GET['language']) && isset($_GET['page_title'])) {
    $lang = $_GET['language'];  // z.B. 'de' oder 'en'
    $page_title= $_GET['page_title'];  // Der translation_key, nach dem wir filtern wollen

    // Sicherstellen, dass der Sprachcode genau 2 Zeichen hat
    if (strlen($lang) !== 2) {
        echo json_encode(["error" => "Invalid language code"]);
        exit();
    }

    // SQL-Abfrage, um alle Übersetzungen zu holen
    $sql = "SELECT id, translation_key, translations FROM translations WHERE page_title = :page_title";
    
    // Vorbereiten und Ausführen der SQL-Abfrage
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':page_title', $page_title);
    $stmt->execute();

    // Alle Zeilen der Abfrage als assoziatives Array holen
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Array für gefilterte Daten
    $filteredData = [];

    // Durch die Daten iterieren und die entsprechende Übersetzung herausfiltern
    foreach ($data as $row) {
        // Die JSON-Daten in ein Array decodieren
        $translations = json_decode($row['translations'], true);
        
        // Überprüfen, ob die gewünschte Sprache existiert
        if (isset($translations[$lang])) {
            // Gefilterte Daten in das Resultat-Array hinzufügen
            $filteredData[$row['translation_key']] = $translations[$lang];
        }
    }

    // Rückgabe der gefilterten Daten als JSON
    echo json_encode($filteredData);
} else {
    // Falls keine Sprache angegeben wurde, Fehlerbehandlung
    echo json_encode(["error" => "No language parameter provided"]);
}
?>
