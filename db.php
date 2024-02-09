<?php
echo "COB290 Database Connection";

$servername = "localhost";
$username = "host";
$password = "Team017FTW!";
$dbname = "makeitall";

//create connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
