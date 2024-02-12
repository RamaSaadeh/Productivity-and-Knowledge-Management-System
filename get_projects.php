<?php

echo "Database Connection";

$servername = "localhost";
$username = "team017";
$password = "xngk4RgUqJxMjKX3EMak";
$database = "team017";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";



// SQL query to fetch options from the database
$sql = "SELECT project_id, proj_name FROM `projects`;";
$result = $conn->query($sql);


// Generate values for each option in the dropdown
while ($row = $result->fetch_assoc()) {
    echo '<option value="' . $row['project_id'] . '">' . $row['project_id'] .': '. $row['proj_name'] . '</option>';
}

echo '</select>';

$conn->close();
?>