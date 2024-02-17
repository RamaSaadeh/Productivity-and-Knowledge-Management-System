function toggle(event, tab) {

	var i = 0;
	var tabcontent;
	var btnTabs;

	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	btnTabs = document.getElementsByClassName("btnTabs");
	for (i = 0; i < btnTabs.length; i++) {
		btnTabs[i].className = btnTabs[i].className.replace(" active", "");
	}

	document.getElementById(tab).style.display = "block";
	event.currentTarget.className += " active";
}

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
	event.preventDefault();
	colour = "#D2D2D2";
	document.getElementById("password").style.borderColor = colour;
	var complete = passwordComplete();
	var a = document.getElementById("success");
	a.style.display = "none";
	var b = document.getElementById("success");
	b.style.display = "none";
	if (!complete) return;
	var details = sessionStorage.getItem("user");
	var id = JSON.parse(details).id;
	//check if new password == old password
	$.ajax({
		type: "POST",
		url: "profile.php",
		data: {
			id: id,
			password: document.getElementById("password").value
		},
		success: function (response) {
			alert(response);
			if (response == "invalid") {
				b.style.display = "block";
				return;
			}
		},
		error: function () {
			alert("error");
		}
	});

	$("#passwordDetails").slideUp();
	a.style.display = "block";
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

var inviteForm = document.getElementById("inviteuseropaquebg");

function openForm() {
	inviteForm.style.display = "block";
}

function closeForm() {
	inviteForm.style.display = "none";
	document.getElementById("email").value = "";
	document.getElementById("emailError").style.display = "none";
}

function sendInvite() {
	var email = document.getElementById("email").value;
	var label = document.getElementById("emailError");
	if (email.slice(email.length - 18).toLowerCase() != "@make-it-all.co.uk") {
		label.innerHTML = "Email address is not valid";
		label.style.color = "red";
		label.style.display = "block";
	}
	else {
		label.innerHTML = "Invite sent!";
		label.style.color = "#2fe617";
		label.style.display = "block";
	}
}