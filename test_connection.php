<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "part2-part2";
$username = "host";
$password = "Team017FTW!"; // Replace with the actual password
$dbname = "makeitall";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";


$conn->close()
?>
