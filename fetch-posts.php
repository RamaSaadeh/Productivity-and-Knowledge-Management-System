<?php

header('Content-Type: application/json');

include 'db.php';

$userID = mysqli_real_escape_string($conn, $_GET['userID']); //get user id from request

//query to get valid post information from Posts table
$sql = "SELECT p.PostID, p.Title, p.Content, p.DateCreated, p.DatePublished, p.IsDraft, p.LikesCount, p.Topic, u.name as AuthorName,
        CASE WHEN pl.PostID IS NOT NULL THEN 'true' ELSE 'false' END as IsLiked
        FROM Posts p
        INNER JOIN users u ON p.UserID = u.user_id
        LEFT JOIN PostLikes pl ON p.PostID = pl.PostID AND pl.UserID = $userID
        WHERE p.IsDraft = 0";


$result = $conn->query($sql);

$posts = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        //ensure the IsLiked attribute is correctly read as a boolean 
        $row['IsLiked'] = $row['IsLiked'] === 'true' ? true : false;
        $posts[] = $row; //add the row to the posts array

    }
    echo json_encode($posts); 
} else {
    echo json_encode([]); //if no posts found, return an empty array
}

$conn->close();
?>
