   
    
    
    
    
    
    
    
    // Get the modal and close button
    var modal = document.getElementById("projectsWindow");
    var closeButton = document.querySelector(".closeProj");
    
    // Show the modal when needed
    function showProject() {
    modal.style.display = "block";
    }
    
    // Close the modal when the close button is clicked
    closeButton.onclick = function () {
    modal.style.display = "none";
    };
    
    // Handle form submission when the Submit button is clicked
    var submitButton = document.getElementById("projSubmitButton");
    var inputField = document.getElementById("projInputField");
    
    submitButton.onclick = function () {
    var inputValue = inputField.value;
    // Process the input or perform other actions here
    alert("Project Added");
    modal.style.display = "none";
    };
    
    // Close the modal if the overlay is clicked
    window.onclick = function (event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
    }; 





    
     // Create a "close" button and append it to each list item
     var myNodelist = document.getElementById("toDoList").getElementsByTagName("LI");
     var i;
     for (i = 0; i < myNodelist.length; i++) {
       var span = document.createElement("SPAN");
       var txt = document.createTextNode("\u{1F5D1}");
       span.className = "close";
       span.appendChild(txt);
       myNodelist[i].appendChild(span);
     }
     
     // Click on a close button to hide the current list item
     var close = document.getElementsByClassName("close");
     var i;
     for (i = 0; i < close.length; i++) {
       close[i].onclick = function() {
         var div = this.parentElement;
         div.style.display = "none";
       }
     }
     
     // Add a "checked" symbol when clicking on a list item
     var list = document.getElementById("toDoList").querySelector('ul');
     list.addEventListener('click', function(ev) {
   if (ev.target.tagName === 'LI' || ev.target.tagName === 'P') {
     const listItem = (ev.target.tagName === 'LI') ? ev.target : ev.target.closest('li');
     if (listItem) {
       listItem.classList.toggle('checked');
     }
   }
 }, false);
     
     // Create a new list item when clicking on the "Add" button
     function newElement() {
       var li = document.createElement("li");
       var p = document.createElement("p");
       var inputValue = document.getElementById("toDoInput").value;
       var t = document.createTextNode(inputValue);
       p.appendChild(t);
       li.appendChild(p);
       if (inputValue === '') {
         // they didn't type anything
       } else {
         document.getElementById("toDoUL").appendChild(li);
       }
       document.getElementById("toDoInput").value = "";
     
       var span = document.createElement("SPAN");
       var txt = document.createTextNode("\u{1F5D1}");
       span.className = "close";
       span.appendChild(txt);
       li.appendChild(span);
     
       for (i = 0; i < close.length; i++) {
         close[i].onclick = function() {
           var div = this.parentElement;
           div.style.display = "none";
         }
       }
     }




     function staffSearch() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("staffSearch");
        
        filter = input.value.toUpperCase();
        table = document.getElementById("staffInfo");
        tr = table.getElementsByTagName("tr");
        
    
        for (i = 1; i < tr.length; i++) {
            
    
            fullName = tr[i].getElementsByClassName("fullName")[0];
            fullName = (fullName.textContent || fullName.innerText).toUpperCase().indexOf(filter) > -1;
            userLevel = tr[i].getElementsByClassName("userLevel")[0];
            userLevel = (userLevel.textContent || userLevel.innerText).toUpperCase().indexOf(filter) > -1;
            staffId = tr[i].getElementsByClassName("staffId")[0];
            staffId = (staffId.textContent || staffId.innerText).toUpperCase().indexOf(filter) > -1;
            teamLead = tr[i].getElementsByClassName("teamLeading")[0];
            teamLead = (teamLead.textContent || teamLead.innerText).toUpperCase().indexOf(filter) > -1;
            teamMan = tr[i].getElementsByClassName("teamManaging")[0];
            teamMan = (teamMan.textContent || teamMan.innerText).toUpperCase().indexOf(filter) > -1;
    
            if (fullName){
                tr[i].style.display = "";
            } else if (userLevel){
                tr[i].style.display = "";
            } else if (staffId){
                tr[i].style.display = "";
            } else if (teamLead){
                tr[i].style.display = "";
            } else if (teamMan){
                tr[i].style.display = "";
            } else{
                tr[i].style.display = "none";
            }
            
        }
        
    }





    
    
    
    
    // change content when staff / project / to-do clicked
    
    function staffClicked(){
            document.getElementById("toDoBttn").style.backgroundColor = "rgb(174, 168, 162)";
            document.getElementById("staffToDoContainer").style.display = "none";
            document.getElementById("projectsBttn").style.backgroundColor = "rgb(174, 168, 162)";
            document.getElementById("staffProjectsContainer").style.display = "none";
            document.getElementById("staffBttn").style.backgroundColor = "#be6b25";
            document.getElementById("staffInfoContainer").style.display = "block";
    
        }
    
        function toDoClicked(){
            document.getElementById("staffBttn").style.backgroundColor = "rgb(174, 168, 162)";
            document.getElementById("staffInfoContainer").style.display = "none";
            
            document.getElementById("projectsBttn").style.backgroundColor = "rgb(174, 168, 162)";
            document.getElementById("staffProjectsContainer").style.display = "none";
    
            document.getElementById("toDoBttn").style.backgroundColor = "#be6b25";
            document.getElementById("staffToDoContainer").style.display = "block";
        
        }
    
        function projectsClicked(){
            document.getElementById("toDoBttn").style.backgroundColor = "rgb(174, 168, 162)";
            document.getElementById("staffToDoContainer").style.display = "none";
            document.getElementById("staffBttn").style.backgroundColor = "rgb(174, 168, 162)";
            document.getElementById("staffInfoContainer").style.display = "none";
            document.getElementById("projectsBttn").style.backgroundColor = "#be6b25";
            document.getElementById("staffProjectsContainer").style.display = "block";
        }
    
    
        // setting projects as the initial display
        projectsClicked();
        
        dashboard.addEventListener("click", function() {
            var user = sessionStorage.getItem("user");
            var a = document.getElementById("dashboard");
            switch (user) {
                case "a":
                    a.href = "AdminDashboard.html";
                    break;
                case "g":
                    a.href = "userdash.html";
                    break;					
                case "m":
                    a.href = "managerdash.html";
                    break;
                default:
                    a.href = "#";
            }
        });
            
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




        function deleteUser(){
            confirm("Are you sure you want to delete this user?");
            alert("User removed from the system.");
        }
    
    
        var deleteButtons = document.querySelectorAll('.deleteUserBttn');
        deleteButtons.forEach(function(button) {
            button.onclick = deleteUser;
        });