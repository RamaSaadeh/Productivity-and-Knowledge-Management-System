  // requesting staff info  on page load

  var staffData; // to store the users data in json format

  function populateStaffTable(){
    var staffTable = document.getElementById("staffInfo");
    var tbody = staffTable.querySelector("tbody");

    staffData.forEach(function(item){
          // create a new table row for each user in the database
          var newRow = document.createElement("tr");
          newRow.setAttribute("scope", "row");
          newRow.setAttribute("id", item['user_id']);
          newRow.classList.add("staffMember");

          // create new table cells to hold user information
          var nameCell = document.createElement("td");
          nameCell.classList.add("fullName");
          nameCell.textContent = item['name'];
          var idCell = document.createElement("td");
          idCell.classList.add("staffId");
          idCell.textContent = item['user_id'];
          var roleCell = document.createElement("td");
          roleCell.classList.add("userLevel");
          roleCell.textContent = item['role'];
          var emailCell = document.createElement("td");
          emailCell.classList.add("email");
          emailCell.textContent = item['email'];
          var leadingCell = document.createElement("td");
          leadingCell.classList.add("teamLeading");
          leadingCell.textContent = item['leading'];
          var managingCell = document.createElement("td");
          managingCell.classList.add("teamManaging");
          managingCell.textContent = item['managing'];

        // create a edit user button
        var editCell = document.createElement("td");
        editCell.classList.add("editUser");
        var editButton = document.createElement("button");
        editButton.classList.add("editUserBttn");
        editButton.textContent = "\u270E"; 
        editButton.onclick = editUser;
        editCell.appendChild(editButton);


          // create a delete button
          var deleteCell = document.createElement("td");
          deleteCell.classList.add("deleteUser");
          var deleteButton = document.createElement("button");
          deleteButton.classList.add("deleteUserBttn");
          deleteButton.textContent = "\u2718"; 
          deleteButton.onclick = deleteUser;
          deleteCell.appendChild(deleteButton);


          // append cells to row
          newRow.appendChild(nameCell);
          newRow.appendChild(idCell);
          newRow.appendChild(roleCell);
          newRow.appendChild(emailCell);
          newRow.appendChild(leadingCell);
          newRow.appendChild(managingCell);
          newRow.appendChild(editCell);
          newRow.appendChild(deleteCell);

          // append new row to table
          tbody.appendChild(newRow);
        })
  }

  $(document).ready(function(){


      $.ajax({ 
          url: "return-all-staff.php",
          dataType: "json", // Specify the expected data type of the response
          success: function(data){ // 'data' parameter contains the response from the server
              staffData = data;
              alert("Users data loaded successfully");
              console.log(staffData);
              populateStaffTable();
              // Here you can perform any further operations with the users data if needed
          },
          error: function(xhr, status, error) { // Function to handle errors
              alert("An error occurred while fetching users data: " + error);
          }
      }); 


        //replacing staffData with a different json array (for ease of testing)
    //staffData = JSON.parse('[{"user_id":"1","name":"John Doe","email":"J.Doe@make-it-all.co.uk","role":"General","managing":[],"leading":["2"]},{"user_id":"2","name":"Jane Stevens","email":"JaneStevens@make-it-all.co.uk","role":"Manager","managing":[],"leading":["1"]},{"user_id":"3","name":"Fake Name","email":"fname@make-it-all.co.uk","role":"Admin","managing":["1"],"leading":[]},{"user_id":"4","name":"Donald Donaldson","email":"donald@make-it-all.co.uk","role":"Manager","managing":[],"leading":[]}]');
    //console.log(staffData);

    
  });
    


  function deleteUser(){
    // Get the parent row of the button
    var row = this.closest('tr');

    // Access data within the row
    var fullName = row.querySelector('.fullName').textContent;
    var staffId = row.querySelector('.staffId').textContent;
    // Access other data similarly

    // Ask for confirmation with the data
    if (confirm('Are you sure you want to delete the user ' + fullName + ' with ID ' + staffId + '?')) {
        // Code to delete the user
        alert("user deleted");
    }
  }

  function editUser(){
    // Get the parent row of the button
    var row = this.closest('tr');

    // Access data within the row
    var fullName = row.querySelector('.fullName').textContent;
    var staffId = row.querySelector('.staffId').textContent;
    // Access other data similarly

    // Ask for confirmation with the data
    if (confirm('Are you sure you want to edit user ' + fullName + ' with ID ' + staffId + '?')) {
        // Code to delete the user
        alert("User edited");
    }
  }


  // add editUser onclick function to each edit user button 
  document.querySelectorAll('.editUserBttn').forEach(function(button){
    button.onclick = editUser;
  });

  document.querySelectorAll('.deleteUserBttn').forEach(function(button){
    button.onclick = deleteUser;
  });




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
            userLevel = tr[i].getElementsByClassName("userLevel")[0];
            staffId = tr[i].getElementsByClassName("staffId")[0];
            teamLead = tr[i].getElementsByClassName("teamLeading")[0];
            teamMan = tr[i].getElementsByClassName("teamManaging")[0];
            
            if (fullName && fullName.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else if (userLevel && userLevel.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else if (staffId && staffId.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else if (teamLead && teamLead.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else if (teamMan && teamMan.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else{
                tr[i].style.display = "none";
            }
            
        }
        
    }

    function projectsSearch() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("projectsSearch");
        
        filter = input.value.toUpperCase().trim();
        table = document.getElementById("projectsInfo");
        tr = table.getElementsByTagName("tr");
        
    
        for (i = 1; i < tr.length; i++) {
            
    
            var projectName = tr[i].getElementsByClassName("projectName")[0];
            var projectId = tr[i].getElementsByClassName("projectId")[0];
            var teamManager = tr[i].getElementsByClassName("teamManager")[0];
            var teamLeader = tr[i].getElementsByClassName("teamLeader")[0];
            
            if (projectName && projectName.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else if (projectId && projectId.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else if (teamManager && teamManager.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else if (teamLeader && teamLeader.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else{
                tr[i].style.display = "none";
            }
            
        }
        
    }

  // bootstrap for table sorting
  $(document).ready(function () {
    $('#projectsInfo').DataTable({
        "paging": false , searching: false, info: false // disable pagination, search, page info
      });
    $('.dataTables_length').addClass('bs-select');
  });


  $(document).ready(function () {
    $('#staffInfo').DataTable({
        "paging": false , searching: false, info: false // disable pagination, search, page info
      });
    $('.dataTables_length').addClass('bs-select');
  });

    
    
    
    // change content when staff / project / to-do clicked
    
     // change content when staff / project / to-do clicked
    
    function staffClicked(){
      document.getElementById("toDoBttn").style.backgroundColor = "#d3d3d3";
      document.getElementById("staffToDoContainer").style.display = "none";
      document.getElementById("projectsBttn").style.backgroundColor = "#d3d3d3";
      document.getElementById("staffProjectsContainer").style.display = "none";
      document.getElementById("staffBttn").style.backgroundColor = "#2980B9";
      document.getElementById("staffInfoContainer").style.display = "block";

  }

  function toDoClicked(){
      document.getElementById("staffBttn").style.backgroundColor = "#d3d3d3";
      document.getElementById("staffInfoContainer").style.display = "none";
      
      document.getElementById("projectsBttn").style.backgroundColor = "#d3d3d3";
      document.getElementById("staffProjectsContainer").style.display = "none";

      document.getElementById("toDoBttn").style.backgroundColor = "#2980B9";
      document.getElementById("staffToDoContainer").style.display = "block";
  
  }

  function projectsClicked(){
      document.getElementById("toDoBttn").style.backgroundColor = "#d3d3d3";
      document.getElementById("staffToDoContainer").style.display = "none";
      document.getElementById("staffBttn").style.backgroundColor = "#d3d3d3";
      document.getElementById("staffInfoContainer").style.display = "none";
      document.getElementById("projectsBttn").style.backgroundColor = "#2980B9";
      document.getElementById("staffProjectsContainer").style.display = "block";
  }
    
        // setting projects as the initial display
        projectsClicked();
        
        // adapting dashboard links depending on user role
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

    
    
        var deleteButtons = document.querySelectorAll('.deleteUserBttn');
        deleteButtons.forEach(function(button) {
            button.onclick = deleteUser;
        });