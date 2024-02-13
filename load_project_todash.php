<?php


// // Retrieve the project ID sent via POST
$project_ID_toload = $_POST['ID'];

$servername = "localhost";
$username = "team017";
$password = "xngk4RgUqJxMjKX3EMak";
$database = "team017";  
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query that fetches all tasks from our specified project 
$sql = "SELECT task_id, task_name, hrs_remaining, status, deadline,assigned_to, notes FROM `tasks` WHERE project_id='$project_ID_toload';";

$result = $conn->query($sql);



$alltasks = array();

if ($result->num_rows > 0) {
    while ($task = $result->fetch_assoc()) {

        $eachtask = array(
            $task['task_id'],
            $task['task_name'],
            $task['hrs_remaining'],
            $task['status'],
            $task['deadline'],
            $task['assigned_to'],
            $task['notes']
        );
        
        // Add the each indiviudal $task to the $alltasks array
        array_push($alltasks, $eachtask);
    }
}
// echo json_encode($alltasks);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Now Load staff with same connection

// SQl query that finds the team leader for the given project
$sql = "SELECT leader_id FROM `projects` WHERE project_id = '$project_ID_toload';";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($temp = $result->fetch_assoc()) {
        $project_teamldr = $temp['leader_id'];
    }
}




// SQL query that fetches all tasks from our specified project 
$sql = "SELECT users.user_id, users.name, users.role, users.email FROM users JOIN project_staff ON project_staff.user_id = users.user_id WHERE project_staff.project_id = '$project_ID_toload';";

$result = $conn->query($sql);

$allstaff = array();

if ($result->num_rows > 0) {
    while ($staff = $result->fetch_assoc()) {



        $eachstaff = array(
            $staff['user_id'],
            $staff['name'],
            "",
            $staff['email'],
        );

        if ($staff['user_id'] == $project_teamldr) {
            $eachstaff[2] = "Team Leader";
        } else {
            $eachstaff[2] = $staff['role'];
        }
        
        // Add the each indiviudal $task to the $alltasks array
        array_push($allstaff, $eachstaff);
    }
}

$tasks_and_staff = array();

array_push($tasks_and_staff, $alltasks);
array_push($tasks_and_staff, $allstaff);

echo json_encode($tasks_and_staff);








$conn->close();
?>