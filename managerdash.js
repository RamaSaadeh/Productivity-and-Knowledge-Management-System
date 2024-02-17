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
      a.href = "managerdash.html";
      break;
    default:
      a.href = "#";
  }
});


function addtaskTotable(task_id,task_name,hrs_remaining,status,deadline,assigned_to,notes){

  var table = document.getElementById("taskstable");
  var row = table.insertRow(-1);

  var taskidcell = row.insertCell(0);
  var tasknamecell = row.insertCell(1);
  var hrscell = row.insertCell(2);
  var statuscell = row.insertCell(3);
  var deadlinecell = row.insertCell(4);
  var staffassignedcell = row.insertCell(5);
  var taskactionscell = row.insertCell(6);
  
  taskidcell.innerHTML = task_id;
  tasknamecell.innerHTML = task_name;
  hrscell.innerHTML = hrs_remaining;
  statuscell.innerHTML = status;
  deadlinecell.innerHTML = deadline;  
  staffassignedcell.innerHTML = assigned_to; 

  taskactionscell.innerHTML = '<button class = "notesbtn" onclick="opentasknotesForm(this)">Notes</button><button class="editbtn" onclick="loadtasktoform(this)"><span id="editsymbol" class="material-symbols-outlined">edit</span></button>';
  }


function addStaffTotable(user_id,name,role,email){

  var table = document.getElementById("StaffTable");
  var row = table.insertRow(-1);

  var useridcell = row.insertCell(0);
  var namecell = row.insertCell(1);
  var rolecell = row.insertCell(2);
  var emailcell = row.insertCell(3);

  useridcell.innerHTML = user_id;
  namecell.innerHTML = name;
  rolecell.innerHTML = role;
  emailcell.innerHTML = email;
}


const urlParams = new URLSearchParams(window.location.search);
const selectedProjectID = urlParams.get('selected_project_ID');

$.ajax({
  type: "POST",
  url: "load_project_todash.php",
  data: {
    ID: selectedProjectID
  },
  success: function (response) {
    if (response === "invalid") {
      alert("Something went wrong");
    } else {	

      var allTasks = JSON.parse(response)[0]; //[0] takes the first half of the encoded json array
      var allStaff = JSON.parse(response)[1]; //[1] takes the first half of the encoded json array


      for (var taskrow in allTasks) { //for every task returned, add each to the table
        addtaskTotable(allTasks[taskrow][0],allTasks[taskrow][1],allTasks[taskrow][2],allTasks[taskrow][3],allTasks[taskrow][4],allTasks[taskrow][5],allTasks[taskrow][6]);
      }


      for (var staffrow in allStaff) { //for every staff returned, add each to the table
        addStaffTotable(allStaff[staffrow][0],allStaff[staffrow][1],allStaff[staffrow][2],allStaff[staffrow][3]);
      }
    }
  }
});




























function openaddstaffForm() {

  $.ajax({
    type: "POST",
    url: "loadstaff_not_in_proj.php",
    data: {
      ID: selectedProjectID
    },
    success: function (response) {
      if (response === "invalid") {
        alert("Something went wrong");
      } else {	
        
        var allStaff = JSON.parse(response); //[0] takes the first half of the encoded json array

        var selectDropdown = document.getElementById("select_addstaff");
        //we want to overwrite the select/reset it each time so we dont just add to what was already there
        selectDropdown.innerHTML = '<option value="" disabled selected>Select staff member to add to project</option>';


        for (var staffrow in allStaff) { //for every staff returned, add each to the table

          var option = document.createElement("option");

            // Set the value of the option to user_id
            option.value = allStaff[staffrow][0];
            
            // Concatenate name and email and set it as the text of the option
            option.text = "#" + allStaff[staffrow][0] + "        |         " + allStaff[staffrow][1] + "         |         " + allStaff[staffrow][2];
            
            selectDropdown.appendChild(option);
        }
      }
    }
  });

// now staff not in the team are loaded into the <select> we are going to open the form
 document.getElementById("addstaffopaquebg").style.display = "block";
 
}

function addstaff_toteam(){
  var selectedUserID = document.getElementById("select_addstaff").value;

  $.ajax({
    type: "POST",
    url: "add_team_member.php",
    data: {
      projectID: selectedProjectID,
      userID: selectedUserID
    },
    success: function (response) {
      if (response === "invalid") {
        alert("Something went wrong");
      } 

      window.location.href = "managerdash.html?selected_project_ID="+selectedProjectID;
    }
  });

  // now staff not in the team are loaded into the <select> we are going to open the form
  document.getElementById("addstaffopaquebg").style.display = "none";
}

function closeaddstaffForm(){
 document.getElementById("addstaffopaquebg").style.display = "none";
}

function openchangeroleForm() {

  $.ajax({
    type: "POST",
    url: "loadstaff_in_proj.php",
    data: {
      ID: selectedProjectID
    },
    success: function (response) {
      if (response === "invalid") {
        alert("Something went wrong");
      } else {	

        var allStaff = JSON.parse(response);

        var selectDropdown = document.getElementById("select_changerole");
        //we want to overwrite the select/reset it each time so we dont just add to what was already there
        selectDropdown.innerHTML = '<option value="" disabled selected>Select staff member to add to project</option>';


        for (var staffrow in allStaff) { //for every staff returned, add each to the table

          var option = document.createElement("option");

            // Set the value of the option to user_id
            option.value = allStaff[staffrow][0];
            
            // Concatenate name and email and set it as the text of the option
            option.text = "#" + allStaff[staffrow][0] + "        |         " + allStaff[staffrow][1] + "         |         " + allStaff[staffrow][2];
            
            selectDropdown.appendChild(option);
        }
      }
    }
  });

// now staff not in the team are loaded into the <select> we are going to open the form
 document.getElementById("changeroleopaquebg").style.display = "block";
}

function maketeamleader(){
  var selectedUserID = document.getElementById("select_changerole").value;

  $.ajax({
    type: "POST",
    url: "make_teamleader.php",
    data: {
      projectID: selectedProjectID,
      userID: selectedUserID
    },
    success: function (response) {
      if (response === "invalid") {
        alert("Something went wrong");
      } 

      window.location.href = "managerdash.html?selected_project_ID="+selectedProjectID;
    }
  });

  // now staff not in the team are loaded into the <select> we are going to open the form
  document.getElementById("changeroleopaquebg").style.display = "none";
}

function closechangeroleForm() {
  document.getElementById("changeroleopaquebg").style.display = "none";
}

function openremovestaffForm(){
  $.ajax({
    type: "POST",
    url: "loadstaff_in_proj.php",
    data: {
      ID: selectedProjectID
    },
    success: function (response) {
      if (response === "invalid") {
        alert("Something went wrong");
      } else {	

        var allStaff = JSON.parse(response);

        var selectDropdown = document.getElementById("select_removestaff");
        //we want to overwrite the select/reset it each time so we dont just add to what was already there
        selectDropdown.innerHTML = '<option value="" disabled selected>Select staff member to add to project</option>';


        for (var staffrow in allStaff) { //for every staff returned, add each to the table

          var option = document.createElement("option");

            // Set the value of the option to user_id
            option.value = allStaff[staffrow][0];
            
            // Concatenate name and email and set it as the text of the option
            option.text = "#" + allStaff[staffrow][0] + "        |         " + allStaff[staffrow][1] + "         |         " + allStaff[staffrow][2];
            
            selectDropdown.appendChild(option);
        }
      }
    }
  });

// now staff not in the team are loaded into the <select> we are going to open the form
 document.getElementById("removestaffopaquebg").style.display = "block";
}

function remove_fromteam(){
  var selectedUserID = document.getElementById("select_removestaff").value;

  $.ajax({
    type: "POST",
    url: "remove_teammember.php",
    data: {
      projectID: selectedProjectID,
      userID: selectedUserID
    },
    success: function (response) {
      if (response === "invalid") {
        alert("Something went wrong");
      } 

      window.location.href = "managerdash.html?selected_project_ID="+selectedProjectID;
    }
  });

  // now staff not in the team are loaded into the <select> we are going to open the form
  document.getElementById("removestaffopaquebg").style.display = "none";
}

function closeremovestaffForm() {
  document.getElementById("removestaffopaquebg").style.display = "none";
}

function openaddtaskForm() {

  $.ajax({
    type: "POST",
    url: "find_new_taskID.php",
    data: {
      ID: selectedProjectID
    },
    success: function (response) {
      if (response === "invalid") {
        alert("Something went wrong");
      } else {	

        var newtaskID = JSON.parse(response);
        var newtaskID_textbox = document.getElementById("new_taskID");

        //we want to overwrite the select/reset it each time so we dont just add to what was already there
        newtaskID_textbox.value = newtaskID;


        //once the first ajax returns then load the second ajax
        $.ajax({
          type: "POST",
          url: "loadstaff_in_proj.php",
          data: {
            ID: selectedProjectID
          },
          success: function (response) {
            if (response === "invalid") {
              alert("Something went wrong");
            } else {	
      
              var allStaff = JSON.parse(response);
      
              var selectDropdown = document.getElementById("new_choosestaff_select");
              //we want to overwrite the select/reset it each time so we dont just add to what was already there
              selectDropdown.innerHTML = '';
      
      
              for (var staffrow in allStaff) { //for every staff returned, add each to the table
      
                var option = document.createElement("option");
      
                  // Set the value of the option to user_id
                  option.value = allStaff[staffrow][0];
                  
                  // Concatenate name and email and set it as the text of the option
                  option.text = "#" + allStaff[staffrow][0] + "        |         " + allStaff[staffrow][1] + "         |         " + allStaff[staffrow][2];
                  
                  selectDropdown.appendChild(option);
              }
      
            //placed inside the success so that only displays form after loaded
            document.getElementById("addtaskopaquebg").style.display = "block";
            }
          }
        });





      }
    }
  });
}

function isValidDateString(str) {
  // Split the string by hyphens
  var parts = str.split('-');

  // Check if there are exactly three parts
  if (parts.length !== 3) {
    return false;
  }

  // Check if each part is a valid integer
  for (var i = 0; i < 3; i++) {
    // Parse the part as an integer
    var num = parseInt(parts[i], 10);

    // Check if the parsed number is a valid integer
    if (isNaN(num)) {
      return false;
    }
  }

  // Check if the year, month, and day are in the valid range
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var day = parseInt(parts[2], 10);

  if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  return true;
}

function addnewtask() {

  event.preventDefault();

  var newtaskID = document.getElementById("new_taskID").value;
  var newtaskName = document.getElementById("new_taskname").value;
  var newtaskStatus = document.getElementById("new_statusselect").value; 
  var newhrs = document.getElementById("new_hrs").value; 
  var newtaskDeadline = document.getElementById("new_deadline").value; 

  //to create an array of all staff assigned to this task
  var selectdropdown = document.getElementById("new_choosestaff_select");
  var selectedOptions = selectdropdown.selectedOptions;
  var newtaskStaff = [];
  for (var i = 0; i < selectedOptions.length; i++) {
    newtaskStaff.push(selectedOptions[i].value);
  }


  
 if(isValidDateString(newtaskDeadline)){
  $.ajax({
    type: "POST",
    url: "add_new_task.php",
    data: {
      projectID: selectedProjectID,
      taskID: newtaskID,
      name: newtaskName,
      status: newtaskStatus,
      hrs: newhrs,
      deadline: newtaskDeadline,
      staff: newtaskStaff
    },
    success: function (response) {
      if (response === "invalid") {
        alert("Something went wrong");
      } 

      window.location.href = "managerdash.html?selected_project_ID="+selectedProjectID;
    }
  });

  // now staff not in the team are loaded into the <select> we are going to open the form
  document.getElementById("addtaskopaquebg").style.display = "none";
 } else{
  alert("Invalid date entered");
  // window.location.href = "managerdash.html?selected_project_ID="+selectedProjectID;
 }
}

function closeaddtaskForm() {
  document.getElementById("addtaskopaquebg").style.display = "none";
}



function opentasknotesForm(button) {
  
  var row = button.parentNode.parentNode;

  // Get the data from the cells of the row
  var this_tasks_id = row.cells[0].innerText;
  alert(this_tasks_id);
 
  $.ajax({
    type: "POST",
    url: "load_tasknotes.php",
    data: {
      ID: selectedProjectID,
      taskid: this_tasks_id
    },
    success: function (response) {
      if (response === "invalid") {
        alert("Something went wrong");
      } else {	

        var task_notes = JSON.parse(response);
        alert(task_notes);
       
      }
    }
  });

// now staff not in the team are loaded into the <select> we are going to open the form

  document.getElementById("tasknotesopaquebg").style.display = "block";
}










function toggleSwitchProjDropdown() {
    document.getElementById("switchproj-dropdown").classList.toggle("show");
  }
function toggleTaskSortbyDropdown() {
  document.getElementById("tasksortbydropdown").classList.toggle("show");
}

function openaddnewprojForm() {
  document.getElementById("addnewprojopaquebg").style.display = "block";
}
function closeaddnewprojForm() {
  document.getElementById("addnewprojopaquebg").style.display = "none";
}

function openToDoList() {
  document.getElementById("ToDoListopaquebg").style.display = "block";
}
function closeToDoList() {
  document.getElementById("ToDoListopaquebg").style.display = "none";
}



function closetasknotesForm() {
  document.getElementById("tasknotesopaquebg").style.display = "none";
}

function openedittaskForm() {
  document.getElementById("edittaskopaquebg").style.display = "block";
}
function closeedittaskForm() {
  document.getElementById("edittaskopaquebg").style.display = "none";
}

  
function addLinkToDiv() {
  // Create a new <a> element
  var newproj = document.createElement("a");

  newproj.href = "#"; // Replace with the project URL at later date
  newproj.textContent = document.getElementById("newprojname").value;

  var tempdiv = document.getElementById("switchproj-dropdown");

  tempdiv.appendChild(newproj);
}
  
function addnewtaskTotable(){
  var table = document.getElementById("taskstable");
  var row = table.insertRow(1);
  var taskname = row.insertCell(0);
  var currentstatus = row.insertCell(1);
  var deadline = row.insertCell(2);
  var staffassigned = row.insertCell(3);
  var taskactions = row.insertCell(4);
  
  taskname.innerHTML = document.getElementById("taskname").value;
  currentstatus.innerHTML = document.getElementById("statusselect").value;
  deadline.innerHTML = document.getElementById("deadline").value;     

  var Listofstaff = Array.from(document.getElementById("choosestaff").selectedOptions).map(option => option.value);
  var ListofStaffwithbreaks = Listofstaff.join("<br>");

  staffassigned.innerHTML = ListofStaffwithbreaks;  
  taskactions.innerHTML = '<button class = "notesbtn" onclick="opentasknotesForm()">Notes</button><button class="editbtn" onclick="loadtasktoform(this)"><span id="editsymbol" class="material-symbols-outlined">edit</span></button>';

  closeaddtaskForm();
}


  
var currentrowopened = null; //used so that we can use the same row throughout loadtasktoform() and makechangestotasktable()
function loadtasktoform(button){
  var row = button.parentNode.parentNode;
  currentrowopened = row;
  document.getElementById("taskname-edit").value = row.cells[0].textContent;
  document.getElementById("statusselect-edit").value = row.cells[1].textContent;
  document.getElementById("deadline-edit").value = row.cells[2].textContent;

  openedittaskForm();
}
  
function makechangestotasktable(){
  currentrowopened.cells[0].textContent =  document.getElementById("taskname-edit").value;
  currentrowopened.cells[1].textContent =  document.getElementById("statusselect-edit").value;
  currentrowopened.cells[2].textContent = document.getElementById("deadline-edit").value;  

  var Listofstaff = Array.from(document.getElementById("choosestaff-edit").selectedOptions).map(option => option.value);
  var ListofStaffwithbreaks = Listofstaff.join("<br>");
  
  currentrowopened.cells[3].innerHTML = ListofStaffwithbreaks;

  closeedittaskForm();
}
  
  
function removemember(){	
  var membertoremove = document.getElementById("select-removestaff").value;
  var Allstafftable = document.getElementById("StaffTable");

  var rows = Allstafftable.getElementsByTagName("tr");

  for (var i = 1; i < rows.length; i++) { //loop through all rows of table

      var currentrowstaffname = rows[i].getElementsByTagName("td")[0];
      if (currentrowstaffname.textContent.includes(membertoremove)) {
          Allstafftable.deleteRow(i);
      }
  }
}
  
  
  
  
// document.getElementById("addtask-formbtn").addEventListener("click", addnewtaskTotable);
  


function find_statusquantities(callback) {
  $.ajax({
    type: "POST",
    url: "get_tasks_forpie.php",
    data: {
      ID: selectedProjectID,
    },
    success: function (response) {
      if (response === "invalid") {
        alert("Something went wrong");
      } else {
        var statusquantities = JSON.parse(response);
        callback(statusquantities);
      }
    }
  });
}

// we want to refresh/load this pie chart whenever the window laods- however, before it loads we have to get task summaries
$(document).ready(function() {
  find_statusquantities(function(statusquantities) {
    var statustypes = ["Completed", "OnTrack", "Overdue", "Not Started"];
    var barColors = ["#52ab0c", "#efbf1a", "#ab450c", "#646c6c"];

    new Chart("piechart", {
      type: "doughnut",
      data: {
        labels: statustypes,
        datasets: [{
          backgroundColor: barColors,
          data: statusquantities
        }]
      },
      options: {
        legend: { display: false },
      }
    });
  });
});
  
  
function find_workload(callback) {
  $.ajax({
    type: "POST",
    url: "get_workload.php",
    data: {
      ID: selectedProjectID,
    },
    success: function (response) {
      if (response === "invalid") {
        alert("Something went wrong");
      } else {
        var data = JSON.parse(response);
        callback(data[0], data[1]);
      }
    }
  });
}
  
find_workload(function(workload, staffnames) {
  new Chart("workload-chart", {
    type: "horizontalBar",
    data: {
      labels: staffnames,
      datasets: [{
        backgroundColor: "#efbf1a",
        data: workload
      }]
    },
    options: {
      legend: { display: false },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Hrs of Work Remaining',
            fontColor: "white",
            fontSize: 18
          },
          gridLines: { display: false },
          ticks: { display: false, min: 0, max: 80 }
        }],
        yAxes: [{
          gridLines: { display: false },
          ticks: { fontColor: "white", fontSize: 18 }
        }]
      }
    }
  });
});
  
  
  
  
var close = document.getElementsByClassName("closealertbtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}
  
  
var myNodelist = document.getElementById("toDoList").getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u{1F5D1}");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

var list = document.getElementById("toDoList").querySelector('ul');
list.addEventListener('click', function(ev) {
if (ev.target.tagName === 'LI' || ev.target.tagName === 'P') {
  const listItem = (ev.target.tagName === 'LI') ? ev.target : ev.target.closest('li');
  if (listItem) {
    listItem.classList.toggle('checked');
  }
}
}, false);
      

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






