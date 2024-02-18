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

//Decides which Dash to Link to
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


// single-post.js
document.addEventListener("DOMContentLoaded", function () {
   
    const urlParams = new URLSearchParams(window.location.search);
    let messageTimeout; //variable to store timeout
    
    //character limit for the comments
    const charLimit = 500;
   
    const commentTextArea = document.getElementById('comment');
    const charCountDisplay = document.getElementById('charNum');

    //get post 'title' and 'topic'
    const title = urlParams.get('title');
    const topic = urlParams.get('topic');
	
    //form element for submitting comments
	const commentForm = document.getElementById('comment-form');
	
    //display the post title and topic in the page
    document.getElementById('postTitle').textContent = title || "Unknown Title";
    document.getElementById('postTopic').textContent = topic || "Unknown Topic";
	
    //counter for assigning IDs to comments
	let commentIdCounter = 0;
	
  
    const comments = [];
	
    const posts = {
      
    };
	
	$(document).ready(function() {

		var details = sessionStorage.getItem("user");
		var userID = JSON.parse(details).id;

		//extract postID from the URL parameters
		const urlParams = new URLSearchParams(window.location.search);
		const postID = urlParams.get('id'); 


		//AJAX request to fetch the single post based on postID
		$.ajax({
			url: "fetch-single-post.php",
			type: "GET",
			dataType: "json",
			data: { id: postID,
					userID: userID
			}, 
			success: function(response) {
				if (response.success) {
					
					const post = response.data;

					//populate HTML elements with post details
					$('#postTopic').text(post.Topic);
					$('#postTitle').text(post.Title);
					$('#postContent').html(post.Content);
					$('#authorName').text(post.AuthorName);
					const displayDate = post.DateLastModified ? post.DateLastModified : post.DateCreated;
					$('#postDate').text(displayDate);
					$('#likeCount').text(post.LikesCount);

					//show or hide edit and delete buttons based on `IsUserOwner` value
					if (post.IsUserOwner || post.IsAdmin) {

						$('.edit-post, .delete-post').show();
					} else {
						$('.edit-post, .delete-post').hide();
					}
					//update like button based on `IsLiked`
					if (post.IsLiked) {
						$('.like-post').addClass('liked').attr('data-liked', 'true').attr('title', 'Unlike');
					} else {
						$('.like-post').removeClass('liked').attr('data-liked', 'false').attr('title', 'Like');
					}
					
				} else {
					//handle case where post is not found or another error occurred
					console.error("Error fetching single post: " + response.error);
				}
				
			},
			error: function(xhr, status, error) {
				console.error("Error fetching single post: " + error);
			}
		});
		//handles liking posts
		$('.like-post').click(function() {
			var details = sessionStorage.getItem("user");
			var userID = JSON.parse(details).id;
			const isLiked = $(this).hasClass('liked');

			$.ajax({
				url: 'update-like.php',
				type: 'POST',
				dataType: 'json',
				data: {
					userID: userID,
					postID: postID,
					isLiked: isLiked
				},
				success: function(response) {
					if (response.success) {
						// Update the like count display for the post
						$('#likeCount').text(response.newLikeCount);
						
						// Toggle the like button class and title attribute for the post
						if (isLiked) {
							$('.like-post').removeClass('liked').attr('data-liked', 'false').attr('title', 'Like');
						} else {
							$('.like-post').addClass('liked').attr('data-liked', 'true').attr('title', 'Unlike');
						}
					} else {
						alert(response.message || 'Failed to update like status.');
					}
				},
				error: function(xhr, status, error) {
					console.error("Error: " + error);
					alert('Error updating like status.');
				}
			});
		});
	});

	
	
	
	$(document).ready(function() {
		//get user id
		var details = sessionStorage.getItem("user");
		var userID = JSON.parse(details).id;

		//extract postID from the URL parameters
		const urlParams = new URLSearchParams(window.location.search);
	
		const postID = urlParams.get('id');
		//function to fetch comments for a post
		function fetchComments(postID) {
			$.ajax({
				url: "fetch-comments.php",
				type: "GET",
				dataType: "json",
				data: { id: postID, 
						userID: userID
				},
				 success: function(responseComments) {
					//clear previous comments
					$('#previousComments').empty();
	
					const comments = responseComments.reverse();
	
					//loop through comments and append to the sidebar
					comments.forEach(function(comment) {

                    	const editDeleteIcons = (comment.IsUserOwner || comment.IsAdmin) ? `
                        	<i class="fas fa-edit edit-comment" title="Edit"></i>
                        	<i class="fas fa-trash-alt delete-comment" title="Delete"></i>` : '';

   						const likeButtonClass = comment.HasLiked ? 'like-comment liked' : 'like-comment';
    					const likeButtonTitle = comment.HasLiked ? 'Unlike' : 'Like';


						$('#previousComments').append(`
    						<div class="media comment" data-comment-id="${comment.CommentID}">
       							<div class="media-body comment-content">${comment.CommentContent}</div>
       							<div class="comment-metadata">
            						<div class="comment-user-date">
                						<i class="far fa-user">${comment.AuthorName}</i>
                						&nbsp;
                						<i class="far fa-calendar">${comment.LastModified}</i>
                						<span class="comment-edited" style="display: none;">(edited)</span>
            						</div>
            						<div class="comment-actions">
                						${editDeleteIcons}
                						<i class="fas fa-thumbs-up ${likeButtonClass}" title="${likeButtonTitle}"></i>
                						<span class="like-count">${comment.Likes}</span>
            						</div>
       							</div>
    						</div>
						`);
					});
				},
				error: function(xhr, status, error) {
					console.error("Error fetching comments: " + error);
				}
			});
		}
	
	
		//fetch comments when the page loads
		fetchComments(postID);
	});
	

	
	

	
	
	commentForm.addEventListener('submit', function(event) {
		event.preventDefault(); //stop the form from submitting the usual way
	
		//retrieve comment text and validate it
		const commentText = commentTextArea.value;
	
		//extract postID from the URL
		const urlParams = new URLSearchParams(window.location.search);
		const postID = urlParams.get('id');
	
		if (!postID) {
			displayMessage('Error: Post ID is missing.', false);
			return;
		}
	
		if (commentText.trim() === '') {
			//show error message if comment is empty
			displayMessage('Error: Comment cannot be empty.', false);
		} else {
			//add the comment with postID and show success message
			addComment(commentText, postID);
			displayMessage('Comment posted successfully!', true);
			commentTextArea.value = ''; 
			updateCharCount(); 
		}
	});
	

    //function to update displayed character count
    function updateCharCount() {
        //calculate remaining characters and update the display
        const remaining = charLimit - commentTextArea.value.length;
        charCountDisplay.textContent = `Characters remaining:  ${remaining}`;

        //show error styling if user exceeds the character limit
        if (remaining < 0) {
            charCountDisplay.classList.add('error-text');
        } else {
            charCountDisplay.classList.remove('error-text');
        }
    }

    //function to display messages to the user
    function displayMessage(message, isSuccess) {
        //cancel any existing timeout to clear messages
        if (messageTimeout) {
            clearTimeout(messageTimeout);
        }

        //get elements to display error/success messages
        const errorWrapper = document.getElementById('error-message');
        const successWrapper = document.getElementById('success-message');

      
        errorWrapper.style.display = 'none';
        successWrapper.style.display = 'none';

   
        if (isSuccess) {
    
            document.querySelector('#success-message i').nextSibling.textContent = message;
            successWrapper.style.display = 'flex';
        } else {
   
            document.querySelector('#error-message i').nextSibling.textContent = message;
            errorWrapper.style.display = 'flex';
        }

        //hide messages after 4 seconds
        messageTimeout = setTimeout(() => {
            errorWrapper.style.display = 'none';
            successWrapper.style.display = 'none';
        }, 4000);
    }


    commentTextArea.addEventListener('input', updateCharCount);

    //initial call to set the character count on page load
    updateCharCount();



	//function to add a comment to the comment section

	function createComment(commentText, containerSelector) {


		const formattedCommentText = commentText.replace(/\n/g, '<br>');

		const commentElement = document.createElement('div');
		commentElement.classList.add('media', 'comment');

		const mediaBody = document.createElement('div');
		mediaBody.classList.add('media-body', 'comment-content');
		mediaBody.innerHTML = formattedCommentText;
		commentElement.appendChild(mediaBody);

		commentElement.setAttribute('data-comment-id', commentIdCounter);

	
		const commentMetadata = document.createElement('div');
		commentMetadata.classList.add('comment-metadata');
		commentElement.appendChild(commentMetadata);

		
		//format for new comments
		const currentDate = new Date();
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
		];
		const formattedDate = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

		const commentUserInfo = document.createElement('div');
		commentUserInfo.classList.add('comment-user-date');
		commentUserInfo.innerHTML = `
			<i class="far fa-user"> Haamid Jillani</i>
			&nbsp;
			<i class="far fa-calendar"> ${formattedDate}</i>
			<span class="comment-edited" style="display: none;">(edited)</span> <!-- This span is for the edited text -->
		`;
		commentMetadata.appendChild(commentUserInfo);


	
		const commentActions = document.createElement('div');
		commentActions.classList.add('comment-actions');
		commentMetadata.appendChild(commentActions);

		//create comment edit icon
		const editIcon = document.createElement('i');
		editIcon.classList.add('fas', 'fa-edit', 'edit-comment');
		editIcon.title = "Edit";
		commentActions.appendChild(editIcon);

		//create delete icon
		const deleteIcon = document.createElement('i');
		deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-comment');
		deleteIcon.title = "Delete";
		commentActions.appendChild(deleteIcon);


		//create comment actions container and append to metadata container
		const likeContainer = document.createElement('div');
		likeContainer.classList.add('like-container');


		//create like icon
		const likeIcon = document.createElement('i');
		likeIcon.classList.add('fas', 'fa-thumbs-up', 'like-comment');
		likeIcon.title = "Like";
		likeContainer.appendChild(likeIcon);


		const likeCount = document.createElement('span');
		likeCount.classList.add('like-count');
		likeCount.textContent = "0";  
		likeContainer.appendChild(likeCount);

		commentActions.appendChild(likeContainer);


		//comments work like a stack having the latest ones at the top
		const container = document.querySelector(containerSelector);
		if (container.firstChild) {
			container.insertBefore(commentElement, container.firstChild);
		} else {
			container.appendChild(commentElement);
		}

	
		editIcon.addEventListener('click', () => editComment(editIcon));


		deleteIcon.addEventListener('click', function() {
	
			const commentId = commentElement.getAttribute('data-comment-id');
			openConfirmationModal(commentId); 
		});
		
		return commentElement;
		
	}

		
	//get the current date in specific format
	function getFormattedDate() {
		const currentDate = new Date();
		return currentDate.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	}

	
	//function to toggle content editable state and enforce character limit
	function editPost(editIcon) {
		//toggle edit/save icon
		const isEditing = editIcon.classList.contains('fa-edit');
		editIcon.classList.toggle('fa-save', isEditing);
		editIcon.classList.toggle('fa-edit', !isEditing);

		const elements = [
			{selector: '#postTitle', limit: 40},
			{selector: '#postTopic', limit: 40},
			{selector: '#postContent', limit: 1500}
		];
		
		elements.forEach(({selector, limit}) => {
			const element = document.querySelector(selector);
			const isEditable = element.isContentEditable;
			element.contentEditable = !isEditable;
			
			if (isEditing) {
				element.setAttribute('data-original-content', element.textContent);
				
				//add event listener for character limit
				const enforceLimit = function() {
					const charsLeftElement = document.querySelector('#contentCharsLeft');
					let charsUsed = this.textContent.length;
					let charsLeft = limit - charsUsed;
					
					//update the displayed remaining characters
					if (selector === '#postContent') {
						charsLeftElement.textContent = `${charsLeft} characters left`;
					}

					if (charsUsed > limit) {
						//prevent additional characters
						this.textContent = this.textContent.substring(0, limit);
						charsUsed = limit; 
						charsLeft = limit - charsUsed;
						charsLeftElement.textContent = `${charsLeft} characters left`;

						
						const range = document.createRange();
						const sel = window.getSelection();
						range.selectNodeContents(this);
						range.collapse(false);
						sel.removeAllRanges();
						sel.addRange(range);
					}
				};

				if (!element.enforceLimitListener) {
					element.addEventListener('input', enforceLimit);
					element.enforceLimitListener = enforceLimit;
				}

				//initialize the character count display
				if(selector === '#postContent') {
					enforceLimit.call(element);
				}

				if (selector === '#postContent') element.focus();
			} else {
				//remove the listener if it exists to prevent duplication
				if (element.enforceLimitListener) {
					element.removeEventListener('input', element.enforceLimitListener);
					delete element.enforceLimitListener;
				}
			}
		});

		//if switching from edit to save, handle accordingly
		if (!isEditing) openSaveConfirmationModal();
	}

		  
				
		//close the modal
		function closeModal() {
			//get both modals by ID
			const confirmationModal = document.getElementById('confirmationModal');
			const saveModal = document.getElementById('savePostModal');


			if (confirmationModal.style.display !== "none") {
				confirmationModal.style.display = "none";
			}

			if (saveModal.style.display !== "none") {
				saveModal.style.display = "none";
			}
		}


		  function saveEdits() {
			  const titleElement = document.querySelector('#postTitle');
			  const topicElement = document.querySelector('#postTopic');
			  const contentElement = document.querySelector('#postContent');
		  
			  //character limits
			  let title = titleElement.textContent.substring(0, 40).trim();
			  let topic = topicElement.textContent.substring(0, 40).trim();
			  let content = contentElement.textContent.substring(0, 1500).trim();
		  
			  //update elements with trimmed content
			  titleElement.textContent = title;
			  topicElement.textContent = topic;
			  contentElement.textContent = content;
		  
			  //check for changes and update the database via AJAX
			  const elements = [titleElement, topicElement, contentElement];
			  const hasChanges = elements.some(el => el.textContent.trim() !== el.getAttribute('data-original-content'));
			  if (hasChanges) {
				
				  updatePost({title, topic, content}); //function to make ajax call
				  showEditedStatus(); //add (edited) to end of date
		  
		
			  }
		  
			  //close the modal
			  closeModal(document.getElementById('savePostModal'));
		  }
		  
		  function updatePost(data) {
			  //get postID from the URL parameters
			  const urlParams = new URLSearchParams(window.location.search);
			  const postID = urlParams.get('id');
		  
			  //ajax call to update the post in Posts table
			  $.ajax({
				  url: 'update-post.php',
				  type: 'POST',
				  data: {
					  postID: postID, 
					  title: data.title,
					  topic: data.topic,
					  content: data.content
				  },
				  success: function(response) {
					  console.log('Post updated successfully', response);
					  //success handling
				  },
				  error: function(xhr, status, error) {
					  console.error('Failed to update post', error);
					  //error handling
				  }
			  });
		  }
		  
		  function showEditedStatus() {
			  //find the date element
			  const dateElement = document.getElementById('postDate');
		  
			  //check if the "(edited)" span already exists
			  let editedSpan = dateElement.nextElementSibling;
			  if (!editedSpan || !editedSpan.classList.contains('edited-mark')) {
				  //if it does not exist, create it
				  editedSpan = document.createElement('span');
				  editedSpan.classList.add('edited-mark'); 
				  editedSpan.textContent = ' (edited)';
				  //insert the "(edited)" span after the date element
				  dateElement.parentNode.insertBefore(editedSpan, dateElement.nextSibling);
			  } else {
				  //if it already exists, ensure it's visible
				  editedSpan.style.display = '';
			  }
		  }
		  

		
	
			//function to open the save confirmation modal
		function openSaveConfirmationModal(contentElement) {
			const modal = document.getElementById('savePostModal');
			const confirmSaveBtn = document.getElementById('confirmSave');
			const cancelSaveBtn = document.getElementById('cancelSave');
			const closeSpan = modal.querySelector('.close');


			modal.style.display = "block";


			confirmSaveBtn.onclick = null;
			cancelSaveBtn.onclick = null;
			closeSpan.onclick = null;
			window.onclick = null;


			confirmSaveBtn.onclick = function() {
				saveEdits(contentElement);
				closeModal(); 
			};

		
			cancelSaveBtn.onclick = function() {
				closeModal(); 
			};


			closeSpan.onclick = function() {
				closeModal(); 
			};

			
			window.onclick = function(event) {
				if (event.target === modal) {
					closeModal(); 
				}
			};
		}



	
	function attachCharCountListeners() {
		document.querySelectorAll('[contenteditable="true"]').forEach(el => {
			el.addEventListener('input', () => {
				//determine the character limit based on the element's ID or data attribute
				let charLimit;
				switch(el.id) {
					case 'postTitle':
					case 'postTopic':
						charLimit = 40;
						break;
					case 'postContent':
						charLimit = 1500;
						break;
					default:
						charLimit = 0; //default case
				}
				updateCharCount(el.id, charLimit);
			});
		});
	}


	document.querySelectorAll('.edit-post').forEach(button => {
		button.addEventListener('click', function() {
			
			const titleElement = document.getElementById('postTitle');
			const topicElement = document.getElementById('postTopic');
			const contentElement = document.getElementById('postContent');

			//toggle editing state for each post component
			[titleElement, topicElement, contentElement].forEach(el => {
				if (!el.hasAttribute('data-original-content')) {
					el.setAttribute('data-original-content', el.textContent.trim());
				}
			});

			//pass the edit icon to the function
			editPost(this); 

			//attach character count listeners after making elements editable
			attachCharCountListeners();
		});
	});

	
		

	//function to open the modal and set up the deletion process
	function askDeleteConfirmation(deleteIcon) {
		const postId = deleteIcon.closest('.post').getAttribute('data-post-id'); 
		$('#confirmPostDelete').data('post-id', postId); //attach post id to the delete button
		$('#deleteConfirmationModal').modal('show'); 
	}
	
	
	
	$('#confirmPostDelete').click(function() {

		const postID = urlParams.get('id'); //get post id from the url
		console.log('Deleting post with ID:', postID); 
	
		$.ajax({
			url: 'delete-post.php', 
			type: 'POST',
			dataType: 'json', 
			data: { postId: postID },
			success: function(response) {
				if (response.success) {
					//if the post was successfully deleted
					$(`.post[data-post-id="${postID}"]`).remove(); 
					$('#deleteConfirmationModal').modal('hide'); 
					alert(response.message || 'Post deleted successfully.');
				} else {
					//if the server responded with an error
					alert(response.message || 'Failed to delete post.');
				}
			},
			error: function(xhr, status, error) {
				//handle any AJAX errors
				console.error("Error: " + error);
				alert('Error deleting post.');
			}
		});
	});
	
	$('.delete-post-icon').click(function() {
		askDeleteConfirmation($(this)); //pass the clicked delete icon/button to the function
	});
	

	document.body.addEventListener('click', function(event) {
		if (event.target.classList.contains('delete-comment')) {
			// Get the closest comment element and its ID
			const commentElement = event.target.closest('.comment');
			const commentId = commentElement.getAttribute('data-comment-id');
	
			// Show the confirmation modal
			document.getElementById('confirmationModal').style.display = 'block';
	
			// Store the comment ID in a global variable or directly in the modal's confirm button for later use
			document.getElementById('confirmDelete').setAttribute('data-comment-id', commentId);
		}
	});
	
	// Handle confirmation of deletion
	document.getElementById('confirmDelete').addEventListener('click', function() {
		const commentId = this.getAttribute('data-comment-id'); // Retrieve the comment ID
	
		// Call the function to delete the comment
		deleteComment(commentId);
	});
	
	// Handle cancellation of deletion
	document.getElementById('cancelDelete').addEventListener('click', function() {
		document.getElementById('confirmationModal').style.display = 'none'; // Hide the modal
	});
			
		  //delete icon for posts
		  document.addEventListener('click', function(event) {
			//check if the delete-post icon was clicked
			if (event.target.classList.contains('delete-post')) {
			  // Prevent any default action
			  event.preventDefault();
			  //show the delete confirmation modal
			  document.getElementById('deletePostModal').style.display = 'block';
			}
		  });
	
	
		  const confirmPostDeleteBtn = document.getElementById('confirmPostDelete');
		  const cancelPostDeleteBtn = document.getElementById('cancelPostDelete');
		  const deletePostModal = document.getElementById('deletePostModal');
	
		  confirmPostDeleteBtn.addEventListener('click', function() {
	
			
			window.location.href = 'all-posts.html';
		  });
	
		  cancelPostDeleteBtn.addEventListener('click', function() {
			deletePostModal.style.display = 'none';
		  });
	
		  window.addEventListener('click', function(event) {
			if (event.target === deletePostModal) {
			  deletePostModal.style.display = 'none';
			}
		  });
	

	//delete comments from sidebar
	function deleteComment(commentId) {
		
		fetch('delete-comment.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `commentID=${commentId}`
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				
				const commentElement = document.querySelector(`.comment[data-comment-id="${commentId}"]`);
				commentElement.classList.add('fade-out');
	
			
				commentElement.addEventListener('transitionend', function() {
					commentElement.remove();
				}, { once: true }); 
	
				
				document.getElementById('confirmationModal').style.display = 'none';
			} else {
				alert('Failed to delete comment: ' + data.message);
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert('Error deleting comment.');
		});
	}
		
	
	
	// Event listener for editing comments
	document.body.addEventListener('click', function(event) {
		if (event.target.classList.contains('edit-comment')) {
			// Get the closest comment element and its ID
			const commentElement = event.target.closest('.comment');
			const commentId = commentElement.getAttribute('data-comment-id');
	
			// Get the comment content from the comment element
			const commentContent = commentElement.querySelector('.comment-content').textContent;
	
			// Ensure the textarea exists in the DOM before attempting to set its value
			const editCommentTextarea = document.getElementById('editedCommentContent'); // Updated ID reference
			if (editCommentTextarea) {
				editCommentTextarea.value = commentContent; // Populate the textarea with the comment content
			} else {
				console.error('Textarea for editing comment not found');
			}
	
			// Store the comment ID in a global variable or directly in the modal's confirm button for later use
			const confirmEditButton = document.getElementById('confirmEdit');
			if (confirmEditButton) {
				confirmEditButton.setAttribute('data-comment-id', commentId);
			} else {
				console.error('Confirm edit button not found');
			}
	
			// Show the edit modal, ensuring the modal exists
			const editCommentModal = document.getElementById('editCommentModal');
			if (editCommentModal) {
				editCommentModal.style.display = 'block';
			} else {
				console.error('Edit comment modal not found');
			}
		}
	});
	
	// Handle confirmation of edit
	document.getElementById('confirmEdit').addEventListener('click', function() {
		const commentId = this.getAttribute('data-comment-id'); // Retrieve the comment ID
		const textarea = document.getElementById('editedCommentContent'); // Updated ID reference
	
		// Validate if the textarea is successfully accessed
		if (textarea !== null) {
			const updatedContent = textarea.value; // Get the updated comment content
	
			// Call the function to update the comment
			updateComment(commentId, updatedContent);
		} else {
			console.error('Textarea element not found');
		}
	});
	
	// Handle cancellation of edit
	document.getElementById('cancelEdit').addEventListener('click', function() {
		document.getElementById('editCommentModal').style.display = 'none'; // Hide the edit modal
	});
	
	// Function to update the comment
	function updateComment(commentId, updatedContent) {
		// Send an AJAX request to update the comment in the database
		fetch('edit-comment.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			// Make sure the keys match what the PHP script expects
			body: `commentID=${encodeURIComponent(commentId)}&newContent=${encodeURIComponent(updatedContent)}`
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				// Update the comment content in the HTML
				document.querySelector(`.comment[data-comment-id="${commentId}"] .comment-content`).textContent = updatedContent;
				// Hide the edit modal
				document.getElementById('editCommentModal').style.display = 'none';
			} else {
				alert('Failed to update comment: ' + data.message);
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert('Error updating comment.');
		});
	}
	


	//edit comments
	function addComment(commentText, postID) {

		var details = sessionStorage.getItem("user");
		var userID = JSON.parse(details).id;
		//AJAX call to add the comment to the database
		$.ajax({
			
			url: "add-comment.php",
			type: "POST",
			dataType: "json",
			data: {
				id: postID,
				comment: commentText,
				userID: userID
			},
			success: function(response) {
				//handle success:
				if (response.success) {
					//if successful, fetch comments and update UI
					fetchComments(postID); 
				} else {
					//if it errors, display error
					console.error("Error adding comment: " + response.error);
				}
			},
			error: function(xhr, status, error) {
				//if it errors display error
				console.error("Error adding comment: " + error);
			}
		});
	
		//function to fetch comments for a post
		function fetchComments(postID) {
			var details = sessionStorage.getItem("user");
			var userID = JSON.parse(details).id;

			$.ajax({
				url: "fetch-comments.php",
				type: "GET",
				dataType: "json",
				data: { id: postID,
						userID: userID
				},
				 success: function(responseComments) {
					//clear previous comments
					$('#previousComments').empty();
	
					const comments = responseComments.reverse();
	
					//loop through comments and append to sidebar 
					comments.forEach(function(comment) {

						const editDeleteIcons = (comment.IsUserOwner || comment.IsAdmin) ? `
						  <i class="fas fa-edit edit-comment" title="Edit"></i>
						  <i class="fas fa-trash-alt delete-comment" title="Delete"></i>` : '';

					   	const likeButtonClass = comment.HasLiked ? 'like-comment liked' : 'like-comment';
						const likeButtonTitle = comment.HasLiked ? 'Unlike' : 'Like';

						$('#previousComments').append(`
						<div class="media comment" data-comment-id="${comment.CommentID}">
							<div class="media-body comment-content">${comment.CommentContent}</div>
							<div class="comment-metadata">
						 		<div class="comment-user-date">
							 		<i class="far fa-user">${comment.AuthorName}</i>
									&nbsp;
							 		<i class="far fa-calendar">${comment.LastModified}</i>
							 		<span class="comment-edited" style="display: none;">(edited)</span>
						 		</div>
						 		<div class="comment-actions">
							 		${editDeleteIcons}
							 		<i class="fas fa-thumbs-up ${likeButtonClass}" title="${likeButtonTitle}"></i>
							 		<span class="like-count">${comment.Likes}</span>
						 		</div>
							</div>
				 		</div>
					`);
				});
			},
			error: function(xhr, status, error) {
				console.error("Error fetching comments: " + error);
			}
		});
	
	}
}

	function sortByTop() {
		//sort the comments based on the like count
		const commentsContainer = document.querySelector('.previous-comments');
		const comments = Array.from(commentsContainer.children);
		
		comments.sort((a, b) => {
			const likesA = parseInt(a.querySelector('.like-count').textContent, 10);
			const likesB = parseInt(b.querySelector('.like-count').textContent, 10);
			return likesB - likesA; 
		});

		comments.forEach(comment => {
			commentsContainer.appendChild(comment);
		});
	}
		
		//function for getting the date
	function extractDateFromElement(element) {
		const regex = /(\w+ \d+, \d{4})/;  
		const match = regex.exec(element.textContent);
		return match ? match[1] : null; 
	}

	//sort by newest comments
	function sortByNewest() {
	
		
		const commentsContainer = document.querySelector('.previous-comments');
		const comments = Array.from(commentsContainer.children);

		comments.sort((a, b) => {
			const dateAString = extractDateFromElement(a.querySelector('.comment-user-date'));
			const dateBString = extractDateFromElement(b.querySelector('.comment-user-date'));
			

			
			const dateA = new Date(dateAString);
			const dateB = new Date(dateBString);
			return dateB - dateA; 
		});

		comments.forEach(comment => {
			commentsContainer.appendChild(comment);
		});
	}



	document.getElementById('topCommentsBtn').addEventListener('click', function() {
	  sortByTop();
	  setActiveButton(this);
	});

	document.getElementById('newestCommentsBtn').addEventListener('click', function() {
	  sortByNewest();
	  setActiveButton(this);
	});

	function setActiveButton(selectedButton) {
	 
	  var topCommentsBtn = document.getElementById('topCommentsBtn');
	  var newestCommentsBtn = document.getElementById('newestCommentsBtn');
	  
	
	  topCommentsBtn.classList.remove('active');
	  newestCommentsBtn.classList.remove('active');
	  
	
	  selectedButton.classList.add('active');
	}

	$(document).ready(function() {
		$('#previousComments').on('click', '.like-comment', function() {
			var details = sessionStorage.getItem("user");
			var userID = JSON.parse(details).id;

			const $this = $(this);
			//get comment id
			const commentID = $this.closest('.media.comment').data('comment-id');
			console.log(commentID);
			const isLiked = $this.hasClass('liked'); 
			console.log(isLiked);
	
			$.ajax({
				url: 'update-comment-like.php', 
				type: 'POST',
				data: {
					commentID: commentID, 
					isLiked: isLiked,
					userID: userID
				},
				dataType: 'json',
				success: function(response) {
					if (response.success) {
						//toggle 'liked' class based on current state
						$this.toggleClass('liked');
						
						//update the title attribute based on whether it's now liked or not
						if ($this.hasClass('liked')) {
							$this.attr('title', 'Unlike'); //if the comment is liked, change the title to 'Unlike'
						} else {
							$this.attr('title', 'Like'); //if the comment is unliked, revert the title to 'Like'
						}
						
						//update likes count text
						const $likeCount = $this.siblings('.like-count');
						let likes = parseInt($likeCount.text(), 10);
						likes = isLiked ? likes - 1 : likes + 1; //increment or decrement based on current state
						$likeCount.text(likes);
					} else {
						alert('Failed to update like status: ' + response.message);
					}
				},
				error: function(xhr, status, error) {
					console.error("Error: " + error);
				}
			});
		});
	});
	
	

	


});
