<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  //retrieve relevant topic, title and body fields  
    $topic = $_POST['topic'];
    $title = $_POST['title'];
    $body = $_POST['body'];
    $isDraft = isset($_POST['isDraft']) ? 1 : 0;
    $userId = 1; //will be replaced with a dynamic value representing the logged-in user

    $sql = "INSERT INTO Posts (UserID, Topic, Title, Content, IsDraft) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isssi", $userId, $topic, $title, $body, $isDraft);
    
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
