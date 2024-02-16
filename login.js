async function getData() {
	var a = document.getElementById("loginError");
	a.innerHTML = "Details could not be found";
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	$.ajax({
		type: "POST",
		url: "login.php",
		data: {
			email: email,
			password: password
		},
		success: function (response) {
			if (response == "invalid") {
				a.style.display = "block";
			}
			else {
				a.style.display = "none";
				var array = response.split("/");
				switch (array[1]) {
					case 'Admin':
						array[1] = 'a';
						window.location.replace("AdminDashboard.html");
						break;
					case 'General':
						array[1] = 'g';
						window.location.replace("userdash.html");
						break;
					case 'Manager':
						array[1] = 'm';
						window.location.replace("accessproject.php");
						break;
					case 'Leader':
						array[1] = 'l';
						window.location.replace("accessproject.php");
						break;
				}
				let obj = { id: array[0], role: array[1], email: array[2]};
				sessionStorage.setItem("user", JSON.stringify(obj));
			}
		}
	});	
}