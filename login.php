<?php

	include 'db.php';


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
		$stmt = $conn->prepare("SELECT user_id, role, email FROM `users` WHERE email = ? AND password = ?");
		$stmt->bind_param("ss", $email, $password);
		$stmt->execute();
		$stmt->bind_result($user_id2, $role, $email);
		$stmt->fetch();
		$stmt->close();
		$stmt = $conn->prepare("SELECT leader_id FROM projects");
		$stmt->execute();
		$stmt->bind_result($leaders);
		$leader = false;
		while ($stmt->fetch()) {
			if ($leaders == $user_id2) {
				$role = "Leader";
				$leader = true;
				echo "$user_id2/$role/$email";
			}
		}
		$stmt->close();
		if (!$leader) echo "$user_id2/$role/$email";
	}
?>