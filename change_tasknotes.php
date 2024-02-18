<?php

$project_ID_toadd = $_POST['projectID'];
$task_id = $_POST['taskid'];
$new_notes = $_POST['notes'];

$servername = "localhost";
$username = "team017";
$password = "xngk4RgUqJxMjKX3EMak";
$database = "team017";

$conn = new mysqli($servername, $username, $password, $database);


// SQL query to fetch staff not currently in team from the database
$sql = "UPDATE tasks SET notes = '$new_notes' WHERE project_id = '$project_ID_toadd' AND task_id = '$task_id';";

$result = $conn->query($sql);

$conn->close();

?>