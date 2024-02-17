<?php
$servername = "localhost";
$username = "team017";
$dbpassword = "xngk4RgUqJxMjKX3EMak";
$database = "team017";

$conn = new mysqli($servername, $username, $dbpassword, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Execute SQL queries to fetch users data
$sql = "SELECT user_id, username, email, role FROM users;";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch the results into an associative array
    $usersData = array();
    while($row = $result->fetch_assoc()) {
        $usersData[] = $row;
    }

    // Format the results into JSON format
    $jsonResponse = json_encode($usersData);

    // Set the appropriate headers to indicate JSON content
    header('Content-Type: application/json');

    // Output the JSON response
    echo $jsonResponse;
} else {
    echo "No users found";
}

// Close the database connection
$conn->close();
?>