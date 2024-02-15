<?php
$servername = "localhost";
$username = "team017";
$dbpassword = "xngk4RgUqJxMjKX3EMak";
$database = "team017";

$conn = new mysqli($servername, $username, $dbpassword, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
echo "Connected successfully";

// SQL query to fetch options from the database
$sql = "SELECT name, user_id, role, email FROM users";
$result = $conn->query($sql);
?>