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
				sessionStorage.setItem(response);
			}
		}
	});	
}