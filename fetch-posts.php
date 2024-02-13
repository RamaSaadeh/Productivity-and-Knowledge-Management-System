<?php

header('Content-Type: application/json');

include 'db.php';

//query to get valid post information from Posts table
$sql = "SELECT p.PostID, p.Title, p.Content, p.DateCreated, p.DatePublished, p.IsDraft, p.LikesCount, p.Topic, u.name as AuthorName
        FROM Posts p
        INNER JOIN users u ON p.UserID = u.user_id
        WHERE p.IsDraft = 0";

$result = $conn->query($sql);

$posts = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row; //add the row to the posts array
    }
    echo json_encode($posts); 
} else {
    echo json_encode([]); //if no posts found, return an empty array
}

$conn->close();
?>
