<?php

header('Content-Type: application/json');

include 'db.php';


$userID = mysqli_real_escape_string($conn, $_GET['userID']); //get user id from request


//check if the Post ID is in the request
if (isset($_GET['id'])) {
    //sanitize the input to prevent SQL injection
    $postId = mysqli_real_escape_string($conn, $_GET['id']);
    
    //query to retrieve the details of the specific post based on its ID
    $sql = "SELECT p.PostID, p.Title, p.Content, p.DateCreated, p.DatePublished, p.IsDraft, p.LikesCount, p.Topic, u.name AS AuthorName,
            (p.UserID = $userID) AS IsUserOwner,
            EXISTS(SELECT 1 FROM PostLikes pl WHERE pl.PostID = p.PostID AND pl.UserID = $userID) AS IsLiked

            FROM Posts p
            INNER JOIN users u ON p.UserID = u.user_id
            WHERE p.PostID = '$postId'";


    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $post = $result->fetch_assoc(); //fetch the post details

        //convert the IsUserOwner and IsLiked values from integer/exists result to boolean
        $post['IsUserOwner'] = (bool)$post['IsUserOwner'];
        $post['IsLiked'] = (bool)$post['IsLiked'];

        //prepare and output the response
        echo json_encode([
            'success' => true,
            'data' => $post
        ]);

        
        echo json_encode($response); //encode response as JSON
    } else {
        echo json_encode(['success' => false, 'error' => 'Post not found']); //if post not found, return error
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Post ID not provided']); //if post id not provided from url, return an error
}


$conn->close();
?>
