<?php

header('Content-Type: application/json');

include 'db.php';

//check if the Post ID is in the request
if (isset($_GET['id'])) {
    //sanitize the input to prevent SQL injection
    $postId = mysqli_real_escape_string($conn, $_GET['id']);
    
    //query to retrieve the details of the specific post based on its ID
    $sql = "SELECT p.PostID, p.Title, p.Content, p.DateCreated, p.DatePublished, p.IsDraft, p.LikesCount, p.Topic, u.name AS AuthorName
            FROM Posts p
            INNER JOIN users u ON p.UserID = u.user_id
            WHERE p.PostID = '$postId'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $post = $result->fetch_assoc(); // Fetch the post details
        echo json_encode($post); // Encode the post details as JSON and output it
    } else {
        echo json_encode(['error' => 'Post not found']); // Return an error if the post is not found
    }
} else {
    echo json_encode(['error' => 'Post ID not provided']); // Return an error if the Post ID is not provided
}

$conn->close();
?>
