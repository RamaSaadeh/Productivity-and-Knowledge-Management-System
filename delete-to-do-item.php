<?php
include "db_config.php";

$conn = new mysqli($servername, $username, $dbpassword, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

 // Set the appropriate headers to indicate JSON content
 header('Content-Type: application/json');

// Execute SQL queries to fetch users data
$sql = "SELECT user_id, name, email, role FROM users;";

$conn->close();

?>