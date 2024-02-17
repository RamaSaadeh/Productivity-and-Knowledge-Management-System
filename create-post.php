<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  //retrieve relevant topic, title and body fields  
    echo "isDraft received: " . (isset($_POST['isDraft']) ? $_POST['isDraft'] : 'Not Set');
	
    $topic = $_POST['topic'];
    $title = $_POST['title'];
    $body = $_POST['body'];
    $isDraft = (isset($_POST['isDraft']) && $_POST['isDraft'] === '0') ? 0 : 1;
    $userID = mysqli_real_escape_string($conn, $_POST['userID']); //get user id from request

    $sql = "INSERT INTO Posts (UserID, Topic, Title, Content, IsDraft) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isssi", $userID, $topic, $title, $body, $isDraft);
    


    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
	 //test comment
}
?>
