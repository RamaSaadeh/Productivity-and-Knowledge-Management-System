<?php
include "db_config.php"

$conn = new mysqli($servername, $username, $dbpassword, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

 // Set the appropriate headers to indicate JSON content
 header('Content-Type: application/json');
$user_id = 3;

// Execute SQL queries to fetch users data
$sql = "(SELECT user_id, item_id, description, checked, time_added FROM `todolist` WHERE user_id =" . strval(user_id) . " AND checked = 0 ORDER BY time_added ASC) UNION (SELECT user_id, item_id, description, checked, time_added FROM `todolist` WHERE user_id =" . strval(user_id) . " AND checked = 1 ORDER BY time_added DESC);";
$result = $conn->query($sql);
$toDoItems = array();


if ($result->num_rows > 0) {
    // Fetch the results into an associative array
    while($row = $result->fetch_assoc()) {
        // append data to staffData array
        $toDoItems[] = $row;
    }
} else {
    echo "No items Found";
}

$jsonResponse = json_encode($toDoItems);



// Output the JSON response
echo $jsonResponse;



// Close the database connection
$conn->close();
?>
