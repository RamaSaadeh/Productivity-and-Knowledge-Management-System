<?php

$project_ID_toload = $_POST['ID'];


$servername = "localhost";
$username = "team017";
$password = "xngk4RgUqJxMjKX3EMak";
$database = "team017";

$conn = new mysqli($servername, $username, $password, $database);


// SQL query to fetch number of tasks Completed
$sql = "SELECT task_id FROM tasks WHERE project_id = '$project_ID_toload' ORDER BY task_id;";

$result = $conn->query($sql);

$counter = 1;

if ($result->num_rows > 0) {
    while ($task = $result->fetch_assoc()) {

        if($counter != (int)$task['task_id']){
            break;
        } else{
            $counter = $counter + 1;
        }
    }
}

echo json_encode($counter);

?>