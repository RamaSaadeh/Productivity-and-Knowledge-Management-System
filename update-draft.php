<?php
include 'db.php';

//check if all required fields are set
if (isset($_POST['postID'], $_POST['title'], $_POST['topic'], $_POST['body'])) {
    //sanitize inputs
    $postID = $_POST['postID'];
    $title = $_POST['title'];
    $topic = $_POST['topic'];
    $body = $_POST['body'];

    //SQL statement to update the specific draft in Posts table
    $sql = "UPDATE Posts SET Title = ?, Topic = ?, Content = ? WHERE PostID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $title, $topic, $body, $postID);

    //execute the update statement
    if ($stmt->execute()) {
        //draft updated successfully
        $response = array("success" => true, "message" => "Draft updated successfully.");
        http_response_code(200);
    } else {
        //error occurred while updating the draft
        $response = array("success" => false, "message" => "Error updating draft.");
        http_response_code(500);
    }

    //close prepared statement
    $stmt->close();
} else {
    //invalid or missing parameters
    $response = array("success" => false, "message" => "Invalid parameters.");
    http_response_code(400);
}


header('Content-Type: application/json');

//output the response
echo json_encode($response);

//close database connection
$conn->close();
?>
