<?php

$project_ID_toadd = $_POST['projectID'];
$user_ID_to_add = $_POST['userID'];

$servername = "localhost";
$username = "team017";
$password = "xngk4RgUqJxMjKX3EMak";
$database = "team017";

$conn = new mysqli($servername, $username, $password, $database);


// SQL query to fetch staff not currently in team from the database
$sql = "INSERT INTO project_staff (project_id, user_id) VALUES ('$project_ID_toadd', '$user_ID_to_add');";

$result = $conn->query($sql);


$conn->close();

?>