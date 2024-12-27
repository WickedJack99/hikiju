<?php
  $host = '';
  $dbname = '';
  $user = '';
  $pass = '';

  try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE , PDO::FETCH_ASSOC);
  } catch (PDOException $e) {
    //die("Database connection failed: " . $e->getMessage());
    echo "Error";
  }
?>