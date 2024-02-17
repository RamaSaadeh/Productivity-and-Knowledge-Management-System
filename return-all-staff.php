<?php

include "db_config.php";

$conn = new mysqli($servername, $username, $dbpassword, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

 // Set the appropriate headers to indicate JSON content
 header('Content-Type: application/json');

// Execute SQL queries to fetch users data
$sql1 = "SELECT user_id, name, email, role FROM users;";
$sql2 = "SELECT project_id, manager_id, leader_id FROM projects;";
$result1 = $conn->query($sql1);
$result2 = $conn -> query($sql2);

$staffData = array();
$teamsData = array();

if ($result1->num_rows > 0) {
    // Fetch the results into an associative array
    while($row = $result1->fetch_assoc()) {
        // append data to staffData array
        $staffData[] = $row;
    }
} else {
    echo "No users found";
}

if ($result2 -> num_rows > 0){
    while ($row = $result2 -> fetch_assoc()){
        $teamsData[] = $row;
    }
}

// add team membership info to each associative array in staffData
foreach($staffData as &$user){
    $managing = array();
    $leading = array();
    foreach ($teamsData as $team){
        if ($team['manager_id'] == $user['user_id']){
            $managing[] = $team['project_id'];
        }
        if($team['leader_id'] == $user['user_id']){
            $leading[] = $team['project_id'];
        }
    }
    $user['managing'] = $managing;
    $user['leading'] = $leading;
}


// Format the results into JSON format
$jsonResponse = json_encode($staffData);



// Output the JSON response
echo $jsonResponse;



// Close the database connection
$conn->close();
?>