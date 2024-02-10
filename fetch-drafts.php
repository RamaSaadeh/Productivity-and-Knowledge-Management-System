<?php

//connect to database through db.php
include 'db.php';

//hardcoded user ID for testing
$userId = 1;

//SQL query to fetch drafts for the specified user
$sql = "SELECT Title, Content, DateCreated FROM Posts WHERE UserID = ? AND IsDraft = 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

//array to store fetched drafts
$drafts = array();

//fetch drafts and store them in the array
while ($row = $result->fetch_assoc()) {
    //add each draft to the drafts array
    $drafts[] = array(
        'title' => $row['Title'],
        'body' => $row['Content'],
        'lastModified' => $row['DateCreated'] 
    );
}

//close the database connection
$stmt->close();
$conn->close();

//prepare the response as JSON
header('Content-Type: application/json');
echo json_encode(array("drafts" => $drafts));
?>
