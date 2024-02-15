<?php

header('Content-Type: application/json');

include 'db.php';

//hardcoded user ID for testing purposes
$userId = 1;


//check if the Post ID is in the request
if (isset($_GET['id'])) {
    //sanitize the input to prevent SQL injection
    $postId = mysqli_real_escape_string($conn, $_GET['id']);
    
    //query to retrieve the details of the specific post based on its ID
    $sql = "SELECT p.PostID, p.Title, p.Content, p.DateCreated, p.DatePublished, p.IsDraft, p.LikesCount, p.Topic, u.name AS AuthorName,
            (p.UserID = $userId) AS IsUserOwner
            FROM Posts p
            INNER JOIN users u ON p.UserID = u.user_id
            WHERE p.PostID = '$postId'";


    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $post = $result->fetch_assoc(); //fetch the post details
        //prepare the response
        $response = [
            'success' => true,
            'data' => $post,
            'isUserOwner' => (bool)$post['IsUserOwner'] //cas isUserOwner to bool value as can only be 1 or 0
        ];
        
        echo json_encode($response); //encode response as JSON
    } else {
        echo json_encode(['success' => false, 'error' => 'Post not found']); //if post not found, return error
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Post ID not provided']); //if post id not provided from url, return an error
}


$conn->close();
?>
