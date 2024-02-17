var details = sessionStorage.getItem("user");
var role = JSON.parse(details).role;

var email = JSON.parse(details).email;

var id = JSON.parse(details).id;

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