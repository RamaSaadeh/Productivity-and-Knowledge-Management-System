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

function openaddtaskForm() {
  document.getElementById("addtaskopaquebg").style.display = "block";
}
function closeaddtaskForm() {
  document.getElementById("addtaskopaquebg").style.display = "none";
}

function opentasknotesForm() {
  document.getElementById("tasknotesopaquebg").style.display = "block";
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

function openchangeroleForm() {
  document.getElementById("changeroleopaquebg").style.display = "block";
}
function closechangeroleForm() {
  document.getElementById("changeroleopaquebg").style.display = "none";
}

function openaddstaffForm() {
  document.getElementById("addstaffopaquebg").style.display = "block";
}
function closeaddstaffForm() {
  document.getElementById("addstaffopaquebg").style.display = "none";
}

function openremovestaffForm() {
  document.getElementById("removestaffopaquebg").style.display = "block";
}
function closeremovestaffForm() {
  document.getElementById("removestaffopaquebg").style.display = "none";
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
  
  
function maketeamleader(){	
  var Allstafftable = document.getElementById("StaffTable");

  var rows = Allstafftable.getElementsByTagName("tr");

  //We first must get rid of old Team Leader
  for (var i = 1; i < rows.length; i++) { //loop through all rows of table

      var currentrowrole = rows[i].getElementsByTagName("td")[1];
      if (currentrowrole.textContent.includes("Team Leader")) {
          currentrowrole.textContent = "xxxxxx";
      }
  }
    
  //Below finds member and makes them Team Leader
  var membertomaketeamleader = document.getElementById("select-changerole").value;

  for (var i = 1; i < rows.length; i++) { //loop through all rows of table

      var currentrowstaffname = rows[i].getElementsByTagName("td")[0];
      var currentrowrole = rows[i].getElementsByTagName("td")[1];
      if (currentrowstaffname.textContent.includes(membertomaketeamleader)) {
          currentrowrole.textContent = "Team Leader";
      }
  }
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
  
  
  
  
/*All event Listeners*/
document.getElementById("createnewproj-formbtn").addEventListener("click", addLinkToDiv);

document.getElementById("addtask-formbtn").addEventListener("click", addnewtaskTotable);

document.getElementById("changerole-formbtn").addEventListener("click", maketeamleader);

document.getElementById("removestaff-formbtn").addEventListener("click", removemember);
  
  
  
  
  
/*StatusChart*/
var statustypes = ["Complete", "OnTime", "Overdue", "Not Started"];
var statusquantities = [10,6,2,7];
var barColors = ["#054822","rgb(255, 149, 35)","#a1083b","#bbb"];

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
    legend: {display: false},
  }
});
  
  
  
/*WorkloadGraph*/
var workload = [1,4,6,8,2,0,5];
var staffnames = ["John", "Claire", "Steve", "Anne", "Martin", "Jack", "Ben"];

new Chart("workload-chart", {
  type: "horizontalBar",
  data: {
  labels: staffnames,
  datasets: [{
    backgroundColor: "rgb(255, 149, 35)",
    data: workload
  }]
},
  options: {

    legend: {display: false},
    scales: {
      xAxes: [{
        scaleLabel: {
            display: true,
            labelString: 'Number of Tasks',
            fontColor: "white",
            fontSize: 18
        },
        gridLines: {display: false},
        ticks: {
            display: false,
            min: 0, max:10,
            }
            }],
        yAxes: [{
        gridLines: {display: false},
        ticks: {
            fontColor: "white",
            fontSize: 20
            }
            }]
    }
  }
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