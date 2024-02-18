<?php

$servername = "localhost";
$username = "host";
$dbpassword = "Team017FTW!";
$database = "makeitall";

$details = sessionStorage.getItem("user");
$id = JSON.parse(details).id;

$conn = new mysqli($servername, $username, $dbpassword, $database);

// SQL query to fetch options from the database
$sql = "SELECT project_id, proj_name FROM `projects` WHERE leader_id = $id;";
$result = $conn->query($sql);

$array = array();
// Generate values for each option in the dropdown
while ($row = $result->fetch_assoc()) {
    array_push($array,`'<option value="' . $row['project_id'] . '">' . $row['project_id'] .': '. $row['proj_name'] . '</option>'`);
}

array_push($array,"'</select>'");
echo json_encode($array);

$conn->close();
?>