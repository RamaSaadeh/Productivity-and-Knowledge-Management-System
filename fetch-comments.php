<?php

header('Content-Type: application/json');
//connect to database
include 'db.php';

if (isset($_GET['id'])) {
    $postID = mysqli_real_escape_string($conn, $_GET['id']);

    //sql statement to get all comments related to specific post
    $sql = "SELECT c.CommentID, c.PostID, c.UserID, c.CommentContent, c.Likes, c.LastModified, u.name AS AuthorName
            FROM Comments c
            INNER JOIN users u ON c.UserID = u.user_id
            WHERE c.PostID = '$postID'"; 

    //execute query
    $result = $conn->query($sql);

    //check if query was successful
    if ($result) {
        //initialize an array to store comments
        $comments = array();

  
        while ($row = $result->fetch_assoc()) {
            //add each comment to the comments array
            $comments[] = $row;
        }

        //close the connection
        $conn->close();

        //return comments as JSON
        echo json_encode($comments);
    } else {
        //return empty array if failure occurs
        echo json_encode([]);
    }
} else {
    //if postID is not provided, return an error message
    echo json_encode(['error' => 'No postID provided']);
}
?>
