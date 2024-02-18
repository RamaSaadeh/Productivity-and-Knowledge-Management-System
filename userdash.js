  // requesting staff info  on page load

  var staffData; // to store the users data in json format
  var toDoListArray;
  var user_id = 1;
  var max_item_id = 0;

  if (sessionStorage.getItem("user")){
    user_id = sessionStorage.getItem("user")["id"];
  }
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




$(document).ready(function(){
    populateToDoList();
    addOnDeleteFunc();
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








// adding prompts for problem and training buttons
function reportTaskProblem(taskNumber){
    var string = "reported" + taskNumber;
    var problem = "problem" + taskNumber;
    document.getElementById(string).style.display = "block";
    if (document.getElementById(problem).value.length == 0) {
        document.getElementById(string).style.color = "red";
        document.getElementById(string).innerHTML = "Please type a problem";
    }
    else {
        document.getElementById(string).style.color = "#2fe617";
        document.getElementById(string).innerHTML = "Problem reported";
        document.getElementById(problem).value = "";
    }
}
function suggestTraining(taskNumber){
    var string = "requested" + taskNumber;
    var training = "training" + taskNumber;
    document.getElementById(string).style.display = "block";
    if (document.getElementById(training).value.length == 0) {
        document.getElementById(string).style.color = "red";
        document.getElementById(string).innerHTML = "Please type training";
    }
    else {
        document.getElementById(string).style.color = "#2fe617";
        document.getElementById(string).innerHTML = "Training requested";
        document.getElementById(training).value = "";
    }
}

function saved(taskNumber) {
    var string = "submitted" + taskNumber;
    document.getElementById(string).style.display = "block";
}


//Beginning of js for navbar


//Nav Java
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


//Decides which Dash to Link to
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
    a.href = "accessproject.php";
    break;
case "l":
    a.href = "accessproject.php";
    break;
default:
    a.href = "#";
}
});


//End of js for navbar





//js for add tasks button

function openaddtaskForm() {
    document.getElementById("addtaskopaquebg").style.display = "block";
}

function closeaddtaskForm() {
    document.getElementById("addtaskopaquebg").style.display = "none";
}




function team2clicked(){

    document.getElementById("taskTitle").innerHTML = `Audit Information System Tasks      <i class="fa fa-caret-down"></i>`;
    document.getElementById("addTaskBttn").style.display = "block";
    document.getElementById("taskTable").classList.add('hidden');
    document.getElementById("auditTable").classList.remove("hidden");
}


function myTasksClicked(){
    document.getElementById("taskTitle").innerHTML = `My Tasks      <i class="fa fa-caret-down"></i>`;
    document.getElementById("addTaskBttn").style.display = "none";
    document.getElementById("taskTable").classList.remove('hidden');
    document.getElementById("auditTable").classList.add("hidden");
}


myTasksClicked();
