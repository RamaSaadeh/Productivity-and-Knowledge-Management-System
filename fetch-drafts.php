<?php

//connect to database through db.php
include 'db.php';

//hardcoded user ID for testing
$userID = mysqli_real_escape_string($conn, $_GET['userID']); //get user id from request

//SQL query to fetch drafts for the specified user
$sql = "SELECT PostID, Title, Content, DateCreated, DateLastModified, Topic FROM Posts WHERE UserID = ? AND IsDraft = 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

//array to store fetched drafts
$drafts = array();

//fetch drafts and store them in the array
while ($row = $result->fetch_assoc()) {
    
    $dateToDisplay = isset($row['DateLastModified']) ? $row['DateLastModified'] : $row['DateCreated'];
    
    //format the date for display
    $formattedDate = date('d F Y \a\t H:i', strtotime($dateToDisplay)); // e.g., "18 February 2024 at 14:29"

    //add each draft to the drafts array
    $drafts[] = array(
        'postID' => $row['PostID'], 
        'title' => $row['Title'],
        'body' => $row['Content'],
        'topic' => $row['Topic'], 
        'lastModified' => $formattedDate 
    );
}

//close the database connection
$stmt->close();
$conn->close();

//prepare the response as JSON
header('Content-Type: application/json');
echo json_encode(array("drafts" => $drafts));
?>
