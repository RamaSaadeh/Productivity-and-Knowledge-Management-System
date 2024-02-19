<?php

$user_name = $_POST['name'];
$user_to_change = $_POST['userID'];
$role = $_POST['role'];



$servername = "localhost";
$username = "host";
$dbpassword = "Team017FTW!";
$database = "makeitall";

$conn = new mysqli($servername, $username, $dbpassword, $database);


// SQL query to fetch staff not currently in team from the database
$sql = "UPDATE users SET name = '$user_name' WHERE role = '$role';";

$result = $conn->query($sql);

$conn->close();

?>