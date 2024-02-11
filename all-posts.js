dashboard.addEventListener("click", function () {
	var details = sessionStorage.getItem("user");
	var role = JSON.parse(details).role;
	var a = document.getElementById("dashboard");
	switch (role) {
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

$(document).ready(function() {

  
  $('.section.topics a#show-all-topics').addClass('active');

  //variables to hold the current state of filters
  var currentSearchTerm = '';
  var currentTopic = 'show-all-topics'; //default to showing all topics

  //function to filter posts by topic and search term
  function filterPosts() {
	var $allPosts = $('.all-content .post'); //target all posts outside the slider

	//initially hide all posts
	$allPosts.hide();

	//If "Show All Posts" is not selected, filter by topic
	var $filteredPosts = currentTopic !== 'show-all-topics' ? 
						 $allPosts.filter('.' + currentTopic) : $allPosts;

	//Further filter by search term if there is one
	if (currentSearchTerm) {
	  $filteredPosts = $filteredPosts.filter(function() {
		var title = $(this).find('.post-title').text().toLowerCase().trim();
		return title.startsWith(currentSearchTerm);
	  });
	}

	//Show the filtered posts
	$filteredPosts.show();
  }

  //event listener for topic links in the sidebar
  $('.section.topics a').click(function(e) {
	e.preventDefault();

	//remove .active class from all topic links and add to the clicked one
	$('.section.topics a').removeClass('active');
	$(this).addClass('active');

	//update the current topic based on the clicked link
	currentTopic = $(this).attr('id');

	// Apply filters
	filterPosts();
  });

  //event listener for the search input
  $('#search-term').on('input', function() {
	//update the current search term
	currentSearchTerm = $(this).val().toLowerCase().trim();

	//apply filters
	filterPosts();
  });
	

	


	  //select all like buttons on the page
  const likeButtons = document.querySelectorAll('.like-comment');

  //add a click event listener to each like button
  likeButtons.forEach(button => {
    button.addEventListener('click', function () {
      //toggle the like state
      const isLiked = button.getAttribute('data-liked') === 'true';
      const likeCountSpan = button.nextElementSibling; 

      //check if the likeCountSpan has data-likes attribute; if not, initialize to 0
      let likesNumber = parseInt(likeCountSpan.getAttribute('data-likes'), 10);
      if (isNaN(likesNumber)) {
        likesNumber = 0; //initialize with 0 if there's an issue with the attribute
      }

      if (isLiked) {
        //if the post is already liked, unlike it
        likesNumber = Math.max(likesNumber - 1, 0); //prevent negative numbers
        button.classList.remove('liked'); //optionally toggle a class to change the button's appearance
        button.setAttribute('data-liked', 'false');
      } else {
        //if the post is not liked, it can be liked
        likesNumber += 1;
        button.classList.add('liked'); //optionally toggle a class to change the button's appearance
        button.setAttribute('data-liked', 'true');
      }

      // Update the likes number in the DOM
      likeCountSpan.textContent = likesNumber > 0 ? likesNumber : ''; //only display if greater than 0
      likeCountSpan.setAttribute('data-likes', likesNumber);
    });
  });


  // Event listener for topic links in the sidebar
  $('.section.topics a').click(function(e) {
    e.preventDefault();
    currentTopic = $(this).attr('id');
    filterPosts(); // apply both filters
  });

  // Event listener for the search input
  $('#search-term').on('input', function() {
    currentSearchTerm = $(this).val().toLowerCase().trim();
    filterPosts(); // apply both filters
  });
  
  		//sort by most liked comments
	function sortByTop() {
	  const posts = document.querySelectorAll('.all-content > .post');
	  const sortedPosts = Array.from(posts).sort((a, b) => {
		// Retrieve the like count from the data-likes attribute
		const likesA = parseInt(a.querySelector('.like-count').getAttribute('data-likes')) || 0;
		const likesB = parseInt(b.querySelector('.like-count').getAttribute('data-likes')) || 0;
		return likesB - likesA; //sort in descending order of likes
	  });

	  const container = document.querySelector('.all-content');
	  if (container) {
		// Remove all current post elements from the DOM to avoid duplicates
		posts.forEach(post => post.remove());

		// Append sorted posts back to the container
		sortedPosts.forEach(post => container.appendChild(post));
	  } else {
		console.error('Posts container not found.');
	  }
	}

	// Ensure the DOM is fully loaded before calling this function


		//sort by newest comments
	function sortByNewest() {
	  const posts = document.querySelectorAll('.all-content > .post');
	  const dateRegex = /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b \d{1,2}, \d{4}/;
	  
	  const sortedPosts = Array.from(posts).sort((a, b) => {
		let dateA = a.querySelector('.fa-calendar').parentNode.textContent.match(dateRegex);
		let dateB = b.querySelector('.fa-calendar').parentNode.textContent.match(dateRegex);

		//convert the extracted date strings to Date objects
		dateA = dateA ? new Date(dateA[0]) : new Date(0); // fallback to epoch if nothing matches
		dateB = dateB ? new Date(dateB[0]) : new Date(0); // fallback to epoch if nothing matches

		return dateB - dateA; // sort by descending date order (newest first)
	  });

	  // Assuming 'all-content' is the container that directly holds the posts
	  const container = document.querySelector('.all-content');
	  if (container) {
		// Remove all post elements from the DOM
		posts.forEach(post => post.remove());

		// Append sorted posts back to the container
		sortedPosts.forEach(post => {
		  container.appendChild(post);
		});
	  } else {
		console.error('Posts container not found.');
	  }
	}

		// Call the function once the page content has loaded
	// Call the function once the page content has loaded
	document.addEventListener('DOMContentLoaded', () => {
	  sortByNewest(); // Sort by newest posts on initial page load
	  newestPostsBtn.classList.add('active'); // Set the newest button to active on initial load
	});

	// Adjust event listeners to check for null and toggle active class
	const topPostsBtn = document.getElementById('topPostsBtn');
	const newestPostsBtn = document.getElementById('newestPostsBtn');

	// Function to toggle active class on buttons
	function toggleButtonActive(clickedBtn) {
	  // Remove 'active' class from both buttons
	  topPostsBtn.classList.remove('active');
	  newestPostsBtn.classList.remove('active');
	  // Add 'active' class to the button that was clicked
	  clickedBtn.classList.add('active');
	}

	if (topPostsBtn) {
	  topPostsBtn.addEventListener('click', () => {
		sortByTop();
		toggleButtonActive(topPostsBtn);
	  });
	} else {
	  console.error('Top Posts button not found.');
	}

	if (newestPostsBtn) {
	  newestPostsBtn.addEventListener('click', () => {
		sortByNewest();
		toggleButtonActive(newestPostsBtn);
	  });
	} else {
	  console.error('Newest Posts button not found.');
	}

});
