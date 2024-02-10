<!DOCTYPE html>
<html>
<head>
	<title>Register | Make-It-All</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="loginStyle.css">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>
<body>
	<br>
	<div id="content" class="container-fluid">
		<div id="top">
			<img src="logo.PNG" id="logo" />
			<h2 id="title"><b>Register</b></h2>
		</div><br>
		<div id="main">
			<form action="javascript:getData()" method="get" id="portal">
				<p>
					<label for="firstName" id="lblFirstName">First Name</label>
					<input name="firstName" type="text" id="firstName" class="details" required /><br><br>
				</p>
				<p>
					<label for="surname" id="lblSurname">Surname</label>
					<input name="surname" type="text" id="surname" class="details" required /><br><br>
				</p>
				<p>
					<label for="email" id="lblEmail">Email</label>
					<input name="email" type="text" id="email" class="details" oninput="detailsInput('email')" required /><br><br>
				</p>
				<p>
					<label for="password" id="lblPassword">Password</label>
					<input name="password" type="password" id="password" class="details" onfocusout="passwordClose()" onfocus="passwordClick()" oninput="detailsInput('password')" /><br><br>
				</p>
				<p>
					<label for="confirm" id="lblConfirm">Confirm Password</label>
					<input name="confirm" type="password" id="confirm" class="details" onfocusout="passwordClose()" onfocus="passwordClick()" oninput="detailsInput('confirm')" /><br>
				</p>
				<div id="passwordDetails" style="display: none; text-align: left; padding: 1%; padding-left: 5%; width: 107%">
					<br>
					<h5 id="length" style="color: red;">Password must be at least 8 characters</h5>
					<h5 id="lowercase" style="color: red">Password must contain a lowercase letter</h5>
					<h5 id="uppercase" style="color: red">Password must contain an uppercase letter</h5>
					<h5 id="number" style="color: red">Password must contain a number</h5>
					<h5 id="special" style="color: red">Password must contain a special character</h5>
					<h5 id="match" style="color: #2fe617">Passwords must match</h5>
				</div>
				<br>
				<input type="submit" id="register" name="register" value="Register" onclick="submitClick()" />
				<input type="submit" id="submit" name="submit" value="Login" style="float:right" onclick="parent.location='standard_index.html'"/><br>
				<h5 id="registerError" style="text-align: left; padding: 1%; color: red; display: none"></h5>
		</div>
	</div>
	<script>	
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
			if (firstName.length == 0 || surname.length == 0 || email.length == 0 || !passwordComplete()) return;
			if (email.slice(email.length - 18).toLowerCase() != "@make-it-all.co.uk") {
				registerError.innerHTML = "Email address is not valid";
				colour = "red";
				document.getElementById("email").style.borderColor = colour;
				a.style.display = "block";
			}
			else {
				registerError.style.color = "#2fe617";
				registerError.innerHTML = "Success!";
				a.style.display = "block";
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
		
	</script>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.min.js"></script>
</body>
</html>