<?php
//connect to database
include 'db.php';

//query to select unique topics from the Posts table for actual posts (exclude drafts)
$sql = "SELECT DISTINCT Topic FROM Posts WHERE IsDraft = 0";

//execute query
$result = $conn->query($sql);

//check if there are results
if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        // Output the topic as list items
        echo '<li><a href="#" class="topic-filter">' . $row['Topic'] . '</a></li>';
    }
} else {
    //if no topics found
    echo '<li>No topics found</li>';
}

//close connection
$conn->close();
?>
