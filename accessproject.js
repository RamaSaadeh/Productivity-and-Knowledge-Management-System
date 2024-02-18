var inviteForm = document.getElementById("inviteuseropaquebg");

function checkLogin() {
    try {
        var details = sessionStorage.getItem("user");
        var role = JSON.parse(details).role;
        switch (role) {
            case "a":
                break;
            case "g":
                break;
            case "m":
                break;
            case "l":
                break;
            default:
                window.location.replace("login.html");
                break;
        }
    }
    catch {
        window.location.replace("login.html");
    }
}

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



function create_newproj(){
    
    var newprojname = document.getElementById("newprojname").value;
    alert(newprojname);

    $.ajax({
      type: "POST",
      url: "create_newproj.php",
      data: {
        name: newprojname
      },
      success: function (response) {
        if (response === "invalid") {
          alert("Something went wrong");
        } 
        var selectedProjectID = JSON.parse(response);
  
        window.location.href = "managerdash.html?selected_project_ID="+selectedProjectID;
      }
    });
}
