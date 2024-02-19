  

  
  // requesting staff info  on page load

  var staffData; // to store the users data in json format
  var toDoListArray;
  var details = sessionStorage.getItem("user");
  var user_id = JSON.parse(details).id;
  var max_item_id = 0;


  //alert("user id: " + user_id);


  function populateToDoList(){
    // request to-do list data for user asynchronously
    $.ajax({
      url: 'return-to-do.php',
      dataType: "json",
      type: 'POST',
      data: { user_id: user_id },
      success: function(data) {
          // Handle the response from the server
          toDoListArray = data;
          console.log('todo list returned successfully');
          document.getElementById("toDoUL").innerHTML = "";
          toDoListArray.forEach(function(itemData){
                // if item_id > max_item_id then replace max_item_id
                if(parseInt(itemData['item_id']) > max_item_id){
                  max_item_id = parseInt(itemData['item_id']);
                }

                //
                var li = document.createElement("li");
                var p = document.createElement("p");
                p.textContent = itemData['description'];
                li.appendChild(p);
                if (itemData['checked'] == '1'){
                  li.classList.add('checked');
                }
                li.setAttribute("id", itemData['item_id']);
                var span = document.createElement("SPAN");
                var txt = document.createTextNode("\u{1F5D1}");
                span.className = "close";
                span.appendChild(txt);
                li.appendChild(span);
                document.getElementById("toDoUL").appendChild(li);
          })
          addOnDeleteFunc();
          console.log(max_item_id);

      },
      error: function(xhr, status, error) {
          // Handle errors
          console.error('Error accessing to do items:', error);
      }
    });


  }
  
  
  




  function populateStaffTable(){
    var staffTable = document.getElementById("staffInfo");
    var tbody = staffTable.querySelector("tbody");
    tbody.innerHTML= "";

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
          
          newRow.appendChild(editCell);
          newRow.appendChild(deleteCell);

          // append new row to table
          tbody.appendChild(newRow);
        })
  }

  $(document).ready(function(){
    populateToDoList();
    addOnDeleteFunc();
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
    if (confirm('Permanently delete user ' + fullName + ' with ID ' + staffId + " from the system?")) {
        // Code to delete the user
        alert("user deleted");
        row.style.display="none";
        $.ajax({
          url: 'delete-user.php',
          type: 'POST',
          data: {'user_id': staffId},
          success: function(response) {
              // Handle the response from the server
              console.log('User deleted from database');
          },
          error: function(xhr, status, error) {
              // Handle errors
              console.error('Error deleting item:', error);
          }
        });


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
     
function addOnDeleteFunc(){     
     // Click on a close button to hide the current list item
     var close = document.getElementsByClassName("close");
     var i;
     for (i = 0; i < close.length; i++) {
       close[i].onclick = function() {
        // remove to do list item
         var li = this.parentElement;
         if (confirm("Are you sure you want to delete this item?: \n\n\n" +  "\"" + li.querySelector("p").textContent + "\"")){
            // delete the to-do list item
            
            // update the database asynchronously
            // Prepare the data to be sent to the server
            if (li.id){
              // item has an id attribute set - delete from database
                  var requestData = {
                    itemId: li.id,
                    userId: user_id
                  };
                  li.style.display = "none";
                  // Make the AJAX request
                  $.ajax({
                    url: 'delete-to-do-item.php',
                    type: 'POST',
                    data: requestData,
                    success: function(response) {
                        // Handle the response from the server
                        console.log('Item deleted successfully');
                    },
                    error: function(xhr, status, error) {
                        // Handle errors
                        console.error('Error deleting item:', error);
                    }
                  });


            } else {
                    // item has no id set, was not stored in database
                    li.style.display = "none";
            }
         }
         
       }
     }
    }



// Add a "checked" symbol when clicking on a list item
// action when to do list item clicked
var list = document.getElementById("toDoList").querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI' || ev.target.tagName === 'P') {
        const listItem = (ev.target.tagName === 'LI') ? ev.target : ev.target.closest('li');
        var description = listItem.querySelector('p').textContent;
          var checked = 0;
        if (listItem) {
          
          if (listItem.classList.contains("checked")){
            // if the item was checked then update db and adjust position
            checked = 1; 
          } 
          $.ajax({
            url: 'toggle-to-do-status.php',
            type: 'POST',
            data: {'item_id': listItem.id, 'user_id': user_id, 'description': description, 'current_status': checked},
            success: function(response) {
                // Handle the response from the server
                console.log('Item edited in db successfully');
            },
            error: function(xhr, status, error) {
                // Handle errors
                console.error('Error toggling item:', error);
            }
          });
          
          moveToDoItem(listItem.id, description, checked);
        }
    }
  }, false);

function moveToDoItem(id, description, checked){
  oldItem = document.getElementById(id);
  document.getElementById("toDoUL").removeChild(oldItem);
  li = document.createElement("li");
  li.setAttribute("id", id);
  p = document.createElement("p");
  p.appendChild(document.createTextNode(description));
  li.appendChild(p);
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u{1F5D1}");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  if (checked == '0'){
    // unchecked -> checked
    li.classList.add("checked");
    // append item to end of the list
    document.getElementById("toDoUL").appendChild(li);
  } else {
    // add item to the start of the list
    document.getElementById("toDoUL").insertAdjacentElement('afterbegin', li);
  }
  addOnDeleteFunc();

}


 function keyPressed(event) {
  // Check if the pressed key is Enter (key code 13)
  if (event.keyCode === 13) {
      // Call the newElement() function
      newElement();
  }
}

// Add event listener for key press on document
document.addEventListener('keypress', keyPressed);
     
// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var p = document.createElement("p");
    var inputValue = document.getElementById("toDoInput").value;
    var t = document.createTextNode(inputValue);
    p.appendChild(t);
    li.appendChild(p);
    var itemId = max_item_id + 1;
    max_item_id +=1;
    li.setAttribute("id", itemId);
    if (inputValue === '') {
      // they didn't type anything
    } else {
    // add new item to the start of the list 
      document.getElementById("toDoUL").insertAdjacentElement('afterbegin', li);
      alert("please");
      // update the todolist table using jQuery AJAX
      $.ajax({
        url: 'add-to-do-item.php',
        type: 'POST',
        data: {'item_id': itemId, 'user_id': user_id, 'description': inputValue},
        success: function(response) {
            // Handle the response from the server
            console.log('Item added to db successfully');
        },
        error: function(xhr, status, error) {
            // Handle errors
            console.error('Error creating item:', error);
        }
      });


    }
    document.getElementById("toDoInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u{1F5D1}");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    addOnDeleteFunc();
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

            
            if (fullName && fullName.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else if (userLevel && userLevel.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else if (staffId && staffId.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else if (teamLead && teamLead.textContent.toUpperCase().trim().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else{
                tr[i].style.display = "none";
            }
            
        }
        
    }


  // bootstrap for table sorting
  $(document).ready(function () {
    $('#staffInfo').DataTable({
        "paging": false , searching: false, info: false // disable pagination, search, page info
      });
    $('.dataTables_length').addClass('bs-select');
  });

     // change content when staff / to-do clicked
    
  function staffClicked(){
    document.getElementById("toDoBttn").style.backgroundColor = "#d3d3d3";
    document.getElementById("staffToDoContainer").style.display = "none";
    document.getElementById("staffBttn").style.backgroundColor = "#2980B9";
    document.getElementById("staffInfoContainer").style.display = "block";

  }

  function toDoClicked(){
      document.getElementById("staffBttn").style.backgroundColor = "#d3d3d3";
      document.getElementById("staffInfoContainer").style.display = "none";
      document.getElementById("toDoBttn").style.backgroundColor = "#2980B9";
      document.getElementById("staffToDoContainer").style.display = "block";
  
  }

        // setting staff as the initial display
        staffClicked();
        
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

        // Get the modal
        var modal = document.getElementById("editModal");

        // Function to open the modal
        function openModal() {
          modal.style.display = "block";
        }

        // Function to close the modal
        function closeModal() {
          modal.style.display = "none";
        }

        // Function to handle form submission
        document.getElementById("editForm").addEventListener("submit", function(event) {
          event.preventDefault(); // Prevent default form submission
          // Here you can handle the form submission using JavaScript or AJAX
          // For this example, let's just close the modal
          closeModal();
        });