var green = "#2fe617";

function passwordClick() {
	$("#passwordDetails").slideDown();
}
function passwordClose() {
	$("#passwordDetails").slideUp();
}
function detailsInput(box) {
	colour = "#D2D2D2";
	document.getElementById(box).style.borderColor = colour;
	a = $("#password").val();
	var colour = (a.length >= 8) ? green : "red";
	$("#length").css('color', colour);

	colour = (a.toUpperCase() != a) ? green : "red";
	$("#lowercase").css('color', colour);

	colour = (a.toLowerCase() != a) ? green : "red";
	$("#uppercase").css('color', colour);

	colour = (/\d/.test(a)) ? green : "red";
	$("#number").css('color', colour);

	var match = specialCheck();
	colour = (match) ? green : "red";
	$("#special").css('color', colour);

	var b = $("#confirm").val();
	colour = (a == b) ? green : "red";
	$("#match").css('color', colour);
}

function specialCheck() {
	var a = $("#password").val();
	for (let i = 0; i < a.length; i++) {
		if (a.charAt(i).match(/^[^a-zA-Z0-9]+$/)) return true;
	}
	return false;
}

function submitClick() {
	colour = "#D2D2D2";
	document.getElementById("password").style.borderColor = colour;
	$("#passwordDetails").slideUp();
	var a = document.getElementById("registerError");
	a.style.display = "none";
	var firstName = document.getElementById("firstName").value;
	var surname = document.getElementById("surname").value;
	var email = document.getElementById("email").value;
	var role = document.getElementById("role").value;
	var password = document.getElementById("password").value;
	if (firstName.length == 0 || surname.length == 0 || email.length == 0 || !passwordComplete()) return;
	if (email.slice(email.length - 18).toLowerCase() != "@make-it-all.co.uk") {
		registerError.innerHTML = "Email address must be assigned to Make-It-All";
		colour = "red";
		document.getElementById("email").style.borderColor = colour;
		a.style.display = "block";
	}
	else {
		$.ajax({
			type: "POST",
			url: "Register.php",
			data: {
				action: "check_email",
				email: email
			},
			success: function (response) {
				if (response == "exists") {
					registerError.innerHTML = "Email address is already in use";
					colour = "red";
					document.getElementById("email").style.borderColor = colour;
					a.style.display = "block";
				}
				else {
					$.ajax({
						type: "POST",
						url: "Register.php",
						data: {
							action: "register_user",
							firstName: firstName,
							surname: surname,
							email: email,
							role: role,
							password: password
						}
					});
					registerError.style.color = "#2fe617";
					registerError.innerHTML = "Success!";
					a.style.display = "block";
				}
			}
		});
	}
}

function passwordComplete() {
	const colours = [];
	colours[0] = document.getElementById("length").style.color;
	colours[1] = document.getElementById("lowercase").style.color;
	colours[2] = document.getElementById("uppercase").style.color;
	colours[3] = document.getElementById("number").style.color;
	colours[4] = document.getElementById("special").style.color;
	colours[5] = document.getElementById("match").style.color;
	if (!colours.includes("red")) return true;
	$("#passwordDetails").slideDown();
	colour = "red";
	document.getElementById("password").style.borderColor = colour;
	document.getElementById("confirm").style.borderColor = colour;
	return false;
}