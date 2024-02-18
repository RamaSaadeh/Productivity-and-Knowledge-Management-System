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

