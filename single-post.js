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
		//extract postID from the URL parameters
		const urlParams = new URLSearchParams(window.location.search);
		const postID = urlParams.get('id'); 


		//AJAX request to fetch the single post based on postID
		$.ajax({
			url: "fetch-single-post.php",
			type: "GET",
			dataType: "json",
			data: { id: postID }, 
			success: function(response) {
				if (response.success) {
					
					const post = response.data;

					//populate HTML elements with post details
					$('#postTopic').text(post.Topic);
					$('#postTitle').text(post.Title);
					$('#postContent').html(post.Content);
					$('#authorName').text(post.AuthorName);
					$('#postDate').text(post.DatePublished);
					$('#likeCount').text(post.LikesCount);

					//show or hide edit and delete buttons based on `isUserOwner` value
					if (post.isUserOwner) {

						$('.edit-post, .delete-post').show();
					} else {
						$('.edit-post, .delete-post').hide();
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
	});
	
	
	
	$(document).ready(function() {
		//extract postID from the URL parameters
		const urlParams = new URLSearchParams(window.location.search);
	
		const postID = urlParams.get('id');
		//function to fetch comments for a post
		function fetchComments(postID) {
			$.ajax({
				url: "fetch-comments.php",
				type: "GET",
				dataType: "json",
				data: { id: postID },
				 success: function(responseComments) {
					//clear previous comments
					$('#previousComments').empty();
	
					const comments = responseComments.reverse();
	
					//loop through comments and append to the sidebar
					comments.forEach(function(comment) {
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
										<i class="fas fa-edit edit-comment" title="Edit"></i>
										<i class="fas fa-trash-alt delete-comment" title="Delete"></i>
										<i class="fas fa-thumbs-up like-comment" title="Like"></i>
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
			//function to toggle content editable state and enforce character limit
			function editPost(editIcon) {
				//toggle edit/save icon
				  const isEditing = editIcon.classList.contains('fa-edit');
				  editIcon.classList.toggle('fa-save', isEditing);
				  editIcon.classList.toggle('fa-edit', !isEditing);
		  
			   //toggle content editable state
				  const elements = ['#postTitle', '#postTopic', '#postContent'];
				  elements.forEach(selector => {
					  const element = document.querySelector(selector);
					  const isEditable = element.isContentEditable;
					  element.contentEditable = !isEditable;
		  
					  if (isEditing) { 
						  element.setAttribute('data-original-content', element.textContent);
						  if (selector === '#postContent') element.focus(); // Focus on content by default
					  }
				  });
		  
			  //if switching from edit to save, open confirmation modal
				  if (!isEditing) openSaveConfirmationModal();
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

	
		
	function openConfirmationModal(commentId) {
		const modal = document.getElementById('confirmationModal');
		const confirmButton = document.getElementById('confirmDelete');
		const cancelButton = document.getElementById('cancelDelete');

		
		modal.style.display = "block";

		confirmButton.onclick = null; 

		
		confirmButton.onclick = function() {
			deleteComment(commentId); //delete comment
			closeModal(); //close the modal after the action
		};

		//cancel button event listener
		cancelButton.onclick = function() {
			closeModal(); // Just close the modal
		};

		//when the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal) {
				closeModal();
			}
		};
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



	function deactivateSortButtons() {
	
		var topCommentsBtn = document.getElementById('topCommentsBtn');
		var newestCommentsBtn = document.getElementById('newestCommentsBtn');

	
		topCommentsBtn.classList.remove('active');
		newestCommentsBtn.classList.remove('active');
		    

	}
	
	

	function deleteComment(commentId) {
	  //find the comment element with the matching data-comment-id attribute
	  const commentElement = document.querySelector(`.comment[data-comment-id="${commentId}"]`);
	  if (commentElement) {
	
		commentElement.classList.add('fade-out');
		
	
		setTimeout(() => {
		  commentElement.remove();
	
		}, 500); 
	  }
	}
	
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
		if (event.target.classList.contains('edit-comment')) {
			
			editComment(event.target);
		} else if (event.target.classList.contains('delete-comment')) {

			const commentElement = event.target.closest('.comment');
			const commentId = commentElement.getAttribute('data-comment-id');
	
			askDeleteConfirmation(event.target);
		}
	});
		
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


	//edit comments
	function editComment(editIcon) {
	  const commentElem = editIcon.closest('.comment');
	  const commentTextElem = commentElem.querySelector('.comment-content');
	  const currentText = commentTextElem.textContent.trim();
	  const maxLength = 500;
	  const remainingLength = maxLength - currentText.length;

	  //ask the user to edit their comment with the remaining character length
	  let newText = prompt(`Edit your comment (max ${maxLength} characters):`, currentText).substring(0, maxLength);

	  if (newText && newText !== currentText) {
		commentTextElem.textContent = newText;

		//show "(edited)" next to the date text
		const editedSpan = commentElem.querySelector('.comment-edited');
		if (editedSpan) {
		  editedSpan.style.display = 'inline'; // This will show the (edited) text
		}

		//update the date to the current date
		const currentDate = new Date();
		const formattedDate = currentDate.toLocaleDateString('en-US', {
		  year: 'numeric',
		  month: 'short',
		  day: 'numeric',
		});
		const dateTextElem = commentElem.querySelector('.date-text');
		if (dateTextElem) {
		  dateTextElem.textContent = ` ${formattedDate}`;
		}

		//update comments in both sections based on the unique identifier
		const commentId = commentElem.getAttribute('data-comment-id');
		const correspondingComments = document.querySelectorAll(`.comment[data-comment-id="${commentId}"]`);

		correspondingComments.forEach(elem => {
		  const contentElem = elem.querySelector('.comment-content');
		  contentElem.textContent = newText;
		  const editedElem = elem.querySelector('.comment-edited');
		  if (editedElem) {
			editedElem.style.display = 'inline'; 
		  }
		  const dateTextElemCorresponding = elem.querySelector('.date-text');
		  if (dateTextElemCorresponding) {
			dateTextElemCorresponding.textContent = ` ${formattedDate}`;
		  }
		});
	  }
	}

	function likeComment(likeIcon) {
		const likeCountElem = likeIcon.nextElementSibling;
		let currentCount = parseInt(likeCountElem.textContent, 10);
		
		//check if comment is already liked by the user
		if(likeIcon.classList.contains('liked')) {
			//decrease the like count
			currentCount--;
			likeIcon.classList.remove('liked');
		} else {
			//like the comment
			currentCount++;
			likeIcon.classList.add('liked');
		}

		likeCountElem.textContent = currentCount.toString();
	}


	function addComment(commentText, postID) {
		//AJAX call to add the comment to the database
		$.ajax({
			
			url: "add-comment.php",
			type: "POST",
			dataType: "json",
			data: {
				id: postID,
				comment: commentText
			},
			success: function(response) {
				//handle success:
				if (response.success) {
					//if successful, fetch comments and update UI
					fetchComments(postID); 
				} else {
					//if it erros, display error
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
			$.ajax({
				url: "fetch-comments.php",
				type: "GET",
				dataType: "json",
				data: { id: postID },
				 success: function(responseComments) {
					//clear previous comments
					$('#previousComments').empty();
	
					const comments = responseComments.reverse();
	
					//loop through comments and append to sidebar 
					comments.forEach(function(comment) {
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
										<i class="fas fa-edit edit-comment" title="Edit"></i>
										<i class="fas fa-trash-alt delete-comment" title="Delete"></i>
										<i class="fas fa-thumbs-up like-comment" title="Like"></i>
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



	document.addEventListener('click', function(event) {
		if (event.target && event.target.classList.contains('like-comment')) {
			likeComment(event.target);
		}
	});
		

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

	

	
	function showError(message) {
		const errorMessage = document.getElementById('error-message');
		const successMessage = document.getElementById('success-message');
		
		//clear any previous success message
		successMessage.style.display = 'none';
		successMessage.textContent = '';
		
		//display the error message
		errorMessage.style.display = 'block';
		errorMessage.textContent = message;
	}

	function showSuccess(message) {
		const errorMessage = document.getElementById('error-message');
		const successMessage = document.getElementById('success-message');
		
		//clear any previous error message
		errorMessage.style.display = 'none';
		errorMessage.textContent = '';
		
		//display the success message
		successMessage.style.display = 'block';
		successMessage.textContent = message;
	}

});
