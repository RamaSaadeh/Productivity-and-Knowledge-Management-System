<?php

$project_ID_toremovefrom = $_POST['projectID'];
$user_ID_to_remove = $_POST['userID'];

$servername = "localhost";
$username = "team017";
$password = "xngk4RgUqJxMjKX3EMak";
$database = "team017";

$conn = new mysqli($servername, $username, $password, $database);


// SQL query to fetch staff not currently in team from the database
$sql = "DELETE FROM project_staff WHERE project_id = '$project_ID_toremovefrom' AND user_id = '$user_ID_to_remove';";

$result = $conn->query($sql);

$conn->close();

?>