<?php
include "db_config.php";

$user_id = intval($_POST['itemId']);
$item_id = intval($_POST['userId']);

$conn = new mysqli($servername, $username, $dbpassword, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

 // Set the appropriate headers to indicate JSON content
 header('Content-Type: application/json');


// Execute SQL queries to fetch users data
$sql = "DELETE FROM todolist WHERE item_id = $item_id AND user_id = $user_id;";
$result = $conn->query($sql);


// Check if the query was successful
if ($result) {
    // Query was successful
    $response = array("success" => true, "message" => "Query successful");
} else {
    // Query failed
    $response = array("success" => false, "message" => "Query failed: " . mysqli_error($conn));
}

echo json_encode($response);

// Close the database connection
$conn->close();
?>
