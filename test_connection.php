<?php
echo "COB290 Database Connection";

$servername = "v2";
$username = "host";
$password = "Team017FTW!";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
