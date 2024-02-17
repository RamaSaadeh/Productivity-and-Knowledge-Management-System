<?php

//connect to database through db.php
include 'db.php';

//hardcoded user ID for testing
$userID = mysqli_real_escape_string($conn, $_GET['userID']); //get user id from request

//SQL query to fetch drafts for the specified user
$sql = "SELECT PostID, Title, Content, DateCreated, Topic FROM Posts WHERE UserID = ? AND IsDraft = 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

//array to store fetched drafts
$drafts = array();

//fetch drafts and store them in the array
while ($row = $result->fetch_assoc()) {
    //add each draft to the drafts array
    $drafts[] = array(
        'postID' => $row['PostID'], 
        'title' => $row['Title'],
        'body' => $row['Content'],
        'topic' => $row['Topic'], 
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
