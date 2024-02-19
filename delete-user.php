<?php
// Include your database configuration file
include "db_config.php";

// Create connection
$conn = new mysqli($servername, $username, $dbpassword, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// User input (example)

$user_id = intval($_POST['user_id']);

// Prepare SQL statement
$sql = "DELETE FROM users WHERE user_id = ?;";
$stmt = $conn->prepare($sql);
// Bind parameters
$stmt->bind_param("i", $user_id);

// Execute SQL statement
if ($stmt->execute()) {
    // Query was successful
    echo "User deleted successfully.";
} else {
    // Query failed
    echo "Error deleting user: " . $stmt->error;
}

// Close the prepared statement
$stmt->close();

// Close the database connection
$conn->close();
?>