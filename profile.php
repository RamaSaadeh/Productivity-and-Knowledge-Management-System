<?php
	$servername = "localhost";
	$username = "team017";
	$dbpassword = "xngk4RgUqJxMjKX3EMak";
	$database = "team017";

	$conn = new mysqli($servername, $username, $dbpassword, $database);

	$id = $_POST['id'];
	$password = hash('sha256', $_POST['password']);

	$stmt = $conn->prepare("SELECT password FROM `users` WHERE user_id = ?");
	$stmt->bind_param("s", $id);
	$stmt->execute();
	$stmt->bind_result($existing_password);
    $stmt->fetch();
    $stmt->close();

	if ($password == $existing_password) {
		echo "invalid";
	}
	else {
		$stmt = $conn->prepare("UPDATE `users` SET password = ? WHERE user_id = ?");
		$stmt->bind_param("ss", $password, $id);
		$stmt->execute();
		$stmt->close();
		echo "valid";
	}
?>