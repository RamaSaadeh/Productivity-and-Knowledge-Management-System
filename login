<!DOCTYPE html>
<html>
<head>
	<title>Login | Make-It-All</title> 
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
			<h2 id="title"><b>Make-It-All Login</b></h2>
		</div><br>
		<div id="main">
			<form action="javascript:getData()" method="get" id="portal">
				<p>
					<label for="email" id="lblEmail">Email</label>
					<input name="email" type="text" id="email" class="details" style="margin-left: 10%" /><br><br>
				</p>
				<p>
					<label for="password" id="lblPassword">Password</label>
					<input name="password" type="password" id="password" class="details" style="margin-left: 10%" /><br><br>
				</p>
				<input type="submit" id="submit" name="submit" value="Login" />
			</form>
			<h5 id="loginError" style="text-align: left; padding: 1%; color: red; display: none"></h5>
			<h5 id="lblRegister" style="text-align: left; padding: 1%; clear: left; width: 120%">Don't have an account? Register below!</h5><br><br>
			<input type="submit" id="register" name="register" value="Register" onclick="parent.location='Register.html'"/><br><br>
		</div>
	</div>
	<script>
		async function getData() {
            var a = document.getElementById("loginError");
            a.style.display = "none";
			var email = document.getElementById("email").value.toLowerCase();
			var password = document.getElementById("password").value;
			if (email == "admin@make-it-all.co.uk" && password == "password") {
				window.location.replace("AdminDashboard.html");
				sessionStorage.setItem("user","a");
			}
			else if (email == "general@make-it-all.co.uk" && password == "password") {
				window.location.replace("userdash.html");
				sessionStorage.setItem("user","g");
			}
			else if (email == "manager@make-it-all.co.uk" && password == "password") {
				window.location.replace("managerdash.html");
				sessionStorage.setItem("user","m");
			}
			else {
				var a = document.getElementById("loginError");
				a.style.display = "block";
                a.innerHTML = "Details could not be found";
			}
		}		
	</script>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.min.js"></script>
</body>
</html>
