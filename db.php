<?php
//database credentials
$servername = "part2-part2"; 
$username = "host"; //updated username
$password = 'Team017FTW!';
$dbname = "makeitall"; //updated database name

//create connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
