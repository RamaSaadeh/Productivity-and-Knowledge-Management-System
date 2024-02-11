<?php
	$servername = "localhost";
	$username = "team017";
	$dbpassword = "xngk4RgUqJxMjKX3EMak";
	$database = "team017";

	$conn = new mysqli($servername, $username, $dbpassword, $database);

	$email = $_POST['email'];
	$password = hash('sha256', $_POST['password']);

	$stmt = $conn->prepare("SELECT COUNT(user_id) FROM `users` WHERE email = ? AND password = ?");
	$stmt->bind_param("ss", $email, $password);
	$stmt->execute();
	$stmt->bind_result($user_id);
    $stmt->fetch();
    $stmt->close();

	if ($user_id == 0) {
		echo "invalid";
	}
	else {
		$stmt = $conn->prepare("SELECT user_id, role FROM `users` WHERE email = ? AND password = ?");
		$stmt->bind_param("ss", $email, $password);
		$stmt->execute();
		$stmt->bind_result($user_id2, $role);
		$stmt->fetch();
		$stmt->close();
		echo "$user_id2/$role";
	}
?>