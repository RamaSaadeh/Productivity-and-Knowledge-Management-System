<?php


$project_ID_toload = $_POST['ID'];


$servername = "localhost";
$username = "host";
$dbpassword = "Team017FTW!";
$database = "makeitall";

$conn = new mysqli($servername, $username, $dbpassword, $database);


// SQL query to fetch staff not currently in team from the database
$sql = "SELECT DISTINCT users.user_id, users.name, users.email \n"

    . "FROM users \n"

    . "JOIN project_staff ON users.user_id = project_staff.user_id \n"

    . "WHERE project_staff.project_id <> '$project_ID_toload'\n"

    . "AND NOT EXISTS (\n"

    . "    SELECT 1\n"

    . "    FROM project_staff AS ps2\n"

    . "    WHERE ps2.user_id = users.user_id\n"

    . "    AND ps2.project_id = '$project_ID_toload'\n"

    . ");";



$result = $conn->query($sql);

$allstaff = array();

if ($result->num_rows > 0) {
    while ($staff = $result->fetch_assoc()) {

        $eachstaff = array(
            $staff['user_id'],
            $staff['name'],
            $staff['email'],
        );
        
        // Add the each indiviudal $task to the $alltasks array
        array_push($allstaff, $eachstaff);
    }
}


echo json_encode($allstaff);

$conn->close();
?>