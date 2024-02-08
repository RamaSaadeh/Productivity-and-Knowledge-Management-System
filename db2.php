<?php
//database credentials
$servername = "aa"; 
$username = "bb"; //updated username
$password = 'cc';
$dbname = "dd"; //updated database name

//create connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
