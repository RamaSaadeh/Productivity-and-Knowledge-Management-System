<?php
	$action = $_POST['action'];

	$servername = "localhost";
	$username = "team017";
	$dbpassword = "xngk4RgUqJxMjKX3EMak";
	$database = "team017";

	$conn = new mysqli($servername, $username, $dbpassword, $database);

	if ($action == "change_password") {
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
	}

	else if ($action == "get_projects") {
		$id = $_POST['id'];

		$stmt = $conn->prepare("SELECT COUNT(project_id) FROM `project_staff` WHERE user_id = ?");
		$stmt->bind_param("s", $id);
		$stmt->execute();
		$stmt->bind_result($num_projects);
		$stmt->fetch();
		$stmt->close();
		if ($num_projects == 0) {
			echo "none";
		}
		else {
			$stmt = $conn->prepare("SELECT project_id FROM `project_staff` WHERE user_id = ? ORDER BY project_id");
			$stmt->bind_param("s", $id);
			$stmt->execute();
			$stmt->bind_result($projects);
			while ($stmt->fetch()) {
				$conn2 = new mysqli($servername, $username, $dbpassword, $database);
				$stmt2 = $conn2->prepare("SELECT proj_name, leader_id FROM `projects` WHERE project_id = ?");
				$stmt2->bind_param("s", $projects);
				$stmt2->execute();
				$stmt2->bind_result($name, $leader);
				$stmt2->fetch();
				$stmt2->close();
				if ($id == $leader) {
					echo "$name-L/";
				}
				else {
					echo "$name/";
				}
			}
			$stmt->close();
		}
	}
?>