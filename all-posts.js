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
			a.href = "accessproject.php";
			break;
		case "l":
			a.href = "accessproject.php";
			break;
		default:
			a.href = "#";
	}
});

var currentSearchTerm = '';
var currentTopic = 'all'; // signifies empty top initially

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

  var details = sessionStorage.getItem("user");
  var userID = JSON.parse(details).id;
    //display dynamic posts from the database

    $.ajax({
        url: "fetch-posts.php",
        type: "GET",
        dataType: "json", //this ensures jQuery treats the response as JSON.
        data: {userID: userID},
		success: function (posts) {
			if (posts.length == 0) {
				$('.all-content').innerHTML = "There are currently no posts!";
				break;
			}
            posts.forEach(function(post) {
                var postClass = post.Topic.toLowerCase().replace(/\s+/g, '-');
                var postHTML = `
                    <div class="post ${postClass}">
                        <div class="media-body">
                            <h3 class="post-topic">${post.Topic}</h3>
                            <h2 class="post-title">${post.Title}</h2>
                            <p class="preview-text">${post.Content}</p>
                            <div class="post-read-more">
                                <a href="single-post.html?id=${post.PostID}" class="btn">More</a>
                            </div>
                        </div>
                        <div class="comment-metadata">
                            <div class="comment-user-date">
                                <i class="far fa-user">${post.AuthorName}</i> &nbsp;
                                <i class="far fa-calendar">${post.DateCreated}</i>
                            </div>
                            <div class="comment-actions">
                                <i class="fas fa-thumbs-up like-comment ${post.IsLiked ? 'liked' : ''}" title="Like" data-post-id="${post.PostID}" data-liked="${post.IsLiked ? 'true' : 'false'}"></i>
                                <span class="like-count" data-post-id="${post.PostID}" data-likes="${post.LikesCount}">${post.LikesCount}</span>
                            </div>
                        </div>
                    </div>`;
                $('.all-content').append(postHTML);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error fetching posts: " + error);
        }
    });

    
    $(document).on('click', '.topic-filter', function(e) {
        e.preventDefault(); 

        var selectedTopic = $(this).text();
        console.log("Selected topic:", selectedTopic);

        //highlight the selected topic
        $('.topic-filter').removeClass('active');
        $(this).addClass('active');

        //update currentTopic based on the selected topic
        currentTopic = selectedTopic === 'Show all topics' ? 'all' : selectedTopic.toLowerCase().replace(/\s+/g, '-');

        //call filterPosts to apply both the topic and search term filters
        filterPosts();
    });

    //function to filter posts by topic and search term
    function filterPosts() {
        console.log("Filtering with search term: " + currentSearchTerm + " and topic: " + currentTopic);
        var $allPosts = $('.all-content .post'); //target all posts

        $allPosts.each(function() {
            var $post = $(this);
            var title = $post.find('.post-title').text().toLowerCase();
            var postClass = $post.attr('class').split(/\s+/).find(function(cl) {
                return cl !== 'post';
            });

            //determine if the post matches the current search term
            var matchesSearch = !currentSearchTerm || title.startsWith(currentSearchTerm);

            //determine if the post matches the current topic
            var matchesTopic = currentTopic === 'all' || postClass === currentTopic;

            if (matchesSearch && matchesTopic) {
                $post.show();
            } else {
                $post.hide();
            }
        });
    };


//event listener for like 
$(document).on('click', '.like-comment', function() {
  const $likeButton = $(this);
  const postID = $likeButton.data('post-id');

  var details = sessionStorage.getItem("user");
  var userID = JSON.parse(details).id;

  //ajax call to update the number of likes (increment or decrement)
  $.ajax({
      url: "update-like.php",
      type: "POST",
      dataType: "json",
      data: { postID: postID, //pass post id
              userID: userID  //pass user id
      },
      success: function(response) {
          if (response.success) {
              //find the like count for specific post and modify it appropriately
              const likeCountSpan = $('.like-count[data-likes][data-post-id="' + postID + '"]');
              likeCountSpan.text(response.newLikeCount); //update the number of likes on the page

              //update the data-likes attribute to the new count
              likeCountSpan.attr('data-likes', response.newLikeCount);

              //toggle the liked class and data-liked attribute based on the new state
              if ($likeButton.data('liked') === 'true' || $likeButton.data('liked') === true) {
                  $likeButton.removeClass('liked').data('liked', false).attr('data-liked', 'false');
              } else {
                  $likeButton.addClass('liked').data('liked', true).attr('data-liked', 'true');
              }
          } else {
              console.error("Failed to update like status: " + response.message);
          }
      },
      error: function(xhr, status, error) {
          console.error("Error updating like status: " + error);
      }
  });
});



$('.section.topics').on('click', 'a', function(e) {
    e.preventDefault();

    var topicText = $(this).text();
    $('.section.topics a').removeClass('active');
    $(this).addClass('active');

    //special handling for "Show all topics"
    currentTopic = (topicText === 'Show all topics') ? 'all' : topicText.toLowerCase().replace(/\s+/g, '-');

    filterPosts(); //reapply filters
});


  //event listener for the search input
  $('#search-term').on('input', function() {
	//update the current search term
	currentSearchTerm = $(this).val().toLowerCase().trim();

	//apply filters
	filterPosts();
  });

	



  //event listener for topic links in the sidebar
  $('.section.topics a').click(function(e) {
    e.preventDefault();
    currentTopic = $(this).attr('id');
    filterPosts(); // apply both filters
  });

  //event listener for the search input
  $('#search-term').on('input', function() {
    currentSearchTerm = $(this).val().toLowerCase().trim();
    filterPosts(); //apply both filters
  });

$(document).ready(function() {
    //fetch and insert dynamic topics from PHP script
    $.get("dynamic-topics.php", function(data) {
        //prepend "Show all topics" with an id for easy access
        $("#dynamic-topics").html('<li><a href="#" id="show-all-topics" class="topic-filter active">Show all topics</a></li>' + data);
    });

});

  
  		//sort by most liked comments
	function sortByTop() {
	  const posts = document.querySelectorAll('.all-content > .post');
	  const sortedPosts = Array.from(posts).sort((a, b) => {
		//retrieve the like count from the data-likes attribute
		const likesA = parseInt(a.querySelector('.like-count').getAttribute('data-likes')) || 0;
		const likesB = parseInt(b.querySelector('.like-count').getAttribute('data-likes')) || 0;
		return likesB - likesA; //sort in descending order of likes
	  });

	  const container = document.querySelector('.all-content');
	  if (container) {
		//remove all current post elements from the DOM to avoid duplicates
		posts.forEach(post => post.remove());

		//append sorted posts back to the container
		sortedPosts.forEach(post => container.appendChild(post));
	  } else {
		console.error('Posts container not found.');
	  }
	}

	//ensure the DOM is fully loaded before calling this function


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

	
	  const container = document.querySelector('.all-content');
	  if (container) {
		//remove all post elements from the DOM
		posts.forEach(post => post.remove());

		//append sorted posts back to the container
		sortedPosts.forEach(post => {
		  container.appendChild(post);
		});
	  } else {
		console.error('Posts container not found.');
	  }
	}

		
	// Call the function once the page content has loaded
	document.addEventListener('DOMContentLoaded', () => {
	  sortByNewest(); // Sort by newest posts on initial page load
	  newestPostsBtn.classList.add('active'); // Set the newest button to active on initial load
	});

	//adjust event listeners to check for null and toggle active class
	const topPostsBtn = document.getElementById('topPostsBtn');
	const newestPostsBtn = document.getElementById('newestPostsBtn');

	//function to toggle active class on buttons
	function toggleButtonActive(clickedBtn) {
	  //remove 'active' class from both buttons
	  topPostsBtn.classList.remove('active');
	  newestPostsBtn.classList.remove('active');
	  //add 'active' class to the button that was clicked
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
