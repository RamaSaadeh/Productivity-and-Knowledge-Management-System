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


$(document).ready(function() {
	
	//declare variables necessary
    var currentEditingDraft = null;
    var draftCounter = 1;
	var currentAction = null; // Declare this to manage current action
	var currentDraftToPost = null;
	
	
    
    $('#post-form').submit(function(e) {
        e.preventDefault();
		
		//get relevant topic title and body 

        const postTopic = $('#post-topic').val();
        const postTitle = $('#post-title').val();
        const postBody = $('#post-body').val();
        
        const errorMessage = $('#error-message');
        const successMessage = $('#success-message');

        errorMessage.removeClass('show');
        successMessage.removeClass('show');
		
		
		//validation
        if (!postTopic || !postTitle || !postBody) {
            errorMessage.text('Please fill in all fields');
            errorMessage.addClass('show');
            setTimeout(function() {
                errorMessage.removeClass('show');
            }, 5000);
            return;
        }
		
		//no longer than 1500 characters
        if (postBody.length > 1500) {
            errorMessage.text('Character limit exceeded (1500 characters max)');
            errorMessage.addClass('show');
            setTimeout(function() {
                errorMessage.removeClass('show');
            }, 5000);
            return;
        }

        successMessage.text('Success!');
        successMessage.addClass('show');
        setTimeout(function() {
            successMessage.removeClass('show');
        }, 5000);

        $('#post-title').val('');
        $('#post-body').val('');
        $('#post-topic').val('');
        $('#character-count').text('1500');
    });
	
	//when saving a draft

    $('#draftButton').click(function() {
        const postTitle = $('#post-title').val();
        const postTopic = $('#post-topic').val();
        const postBody = $('#post-body').val();
        const errorMessage = $('#error-message');
        const successMessage = $('#success-message');

        errorMessage.removeClass('show');
        successMessage.removeClass('show');
	
		const currentDate = new Date();
		const dateString = currentDate.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});


        if (!postTitle || !postTopic || !postBody) {
            errorMessage.text('Please fill in all fields');
            errorMessage.addClass('show');
            setTimeout(function() {
                errorMessage.removeClass('show');
            }, 5000);
            return;
        }

        if (draftCounter >= 2) {
            errorMessage.text("Max 2 saved drafts allowed.");
            errorMessage.addClass('show');
            setTimeout(function() {
                errorMessage.removeClass('show');
            }, 5000);
            return;
        }

        if (currentEditingDraft) {
            currentEditingDraft.find('.draft-title').val(postTitle);
            currentEditingDraft.find('.draft-topic').val(postTopic);
            currentEditingDraft.find('.draft-body').val(postBody);
            currentEditingDraft = null;  // Reset after updating
        } else {
			 const draftHtml = `
			  <div class="media draft">
				<div class="media-body draft-content">
				  <label for="draft-title-${draftCounter}" class="label">Title</label>
				  <input type="text" id="draft-title-${draftCounter}" class="draft-title" value="${postTitle}" maxlength="40"/>
				  
				  <label for="draft-topic-${draftCounter}" class="label">Topic</label>
				  <input type="text" id="draft-topic-${draftCounter}" class="draft-topic" value="${postTopic}" maxlength="40"/>
				  
				  <label for="draft-body-${draftCounter}" class="label">Content</label>
				  <textarea id="draft-body-${draftCounter}" class="draft-body" maxlength="1500">${postBody}</textarea>
				</div>
				<div class="draft-actions">
				  <button class="post-draft">Post</button>
				  <button class="save-draft">Save</button>
				  <button class="delete-draft">Delete</button>				  
				</div>
				<div class="draft-date">Last modified: <span class="draft-last-modified">${dateString}</span></div>
			  </div>
			`;
			
            $('.drafts-container').append(draftHtml);
            draftCounter++;
        }

        $('#post-title').val('');
        $('#post-topic').val('');
        $('#post-body').val('');
        $('#character-count').text('1500');

        successMessage.text('Draft created successfully!');
        successMessage.addClass('show');
        setTimeout(function() {
            successMessage.removeClass('show');
        }, 5000);
    });

	$(document).on('click', '.delete-draft', function() {
		var draftToDelete = $(this).closest('.draft');
		confirmAction('delete', 'Are you sure you want to delete this draft?', function() {
			deleteDraft(draftToDelete);
			displayPopup('Draft deleted successfully!');
		});
	});

	//get the button that was clicked as a jQuery object
	$(document).on('click', '.post-draft', function() {
	  currentDraftToPost = $(this); 
	  confirmAction('post', 'Are you sure you want to post this draft?', function() {
		postDraft(currentDraftToPost); 
		displayPopup('Draft posted successfully!');
	  });
	});




	$(document).on('click', '.save-draft', function() {
		var draftElement = $(this).closest('.draft');

	
		var confirmSaveAction = function() {
			const title = draftElement.find('.draft-title').val();
			const topic = draftElement.find('.draft-topic').val();
			const body = draftElement.find('.draft-body').val();

			if (title.length > 20 || topic.length > 20 || body.length > 1500) {
				displayPopup('Character limit exceeded!');
				return;
			}

			//update the last modified date
			const currentDate = new Date();
			const dateString = currentDate.toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
			draftElement.find('.draft-last-modified').text(dateString);

			displayPopup('Draft saved successfully!');
		};

		//prompt the user for confirmation before saving
		confirmAction('save', 'Are you sure you want to save this draft?', confirmSaveAction);
	});







	function displayPopup(message) {
		$('#notification-message').text(message);
		$('#notification-popup').fadeIn();

		//hide the popup after 3 seconds
		setTimeout(function() {
			$('#notification-popup').fadeOut();
		}, 3000);
	}


//confirm action with a modal-style confirmation
	function confirmAction(action, message, onConfirm) {
	  //create the confirmation HTML, styled to look like a modal popup
	  var confirmationHTML = `
		<div class="confirmation-overlay">
		  <div class="confirmation-box">
			<p>${message}</p>
			<div class="confirmation-buttons">
			  <button class="confirm-yes">Yes</button>
			  <button class="confirm-no">No</button>
			</div>
		  </div>
		</div>
	  `;

	  //if there's already a confirmation, remove it
	  $('.confirmation-overlay').remove();

	  //append the confirmation popup to the body
	  $('body').append(confirmationHTML);

	  var confirmationOverlay = $('.confirmation-overlay');

	
	  confirmationOverlay.find('.confirm-yes').on('click', function() {
		onConfirm(); 
		confirmationOverlay.remove(); 
	  });


	  confirmationOverlay.find('.confirm-no').on('click', function() {
		confirmationOverlay.remove();
	  });
	}



	$(document).on('click', '.close', function() {
	  $('#confirmationModal').fadeOut();
	});

	//when the user clicks "Yes", post the draft
	$(document).on('click', '#confirmPost', function() {
	
	  if (currentDraftToPost) {
		postDraft(currentDraftToPost);
		displayPopup('Your post has been successfully submitted!');
		//clear the stored draft button after posting
		currentDraftToPost = null;
	  } else {

	  }
	  $('#confirmationModal').fadeOut();
	});
	
	


	//when user clicks No, close the modal
	$(document).on('click', '#cancelPost', function() {
	  displayPopup('Post cancelled.');

      currentDraftToPost = null;
	  currentAction = null;
	  $('#confirmationModal').fadeOut();
	  
	});
	
	
  //toggle the menu
    $('.menu-toggle').on('click', function() {
      $('.nav').toggleClass('showing');
      $('.nav ul').toggleClass('showing');
    });
  
    //character count
    $('#post-body').on('input', function() {
      const characterCount = 1500 - $(this).val().length;
      $('#character-count').text(characterCount);
    });
  
	var $buttonElement = $("#someButtonId");
	const $draftContainer = $buttonElement.closest('.media.draft');
  
  
	function editDraft($buttonElement) {
		const $draftContainer = $buttonElement.closest('.draft');
		const title = $draftContainer.find('.draft-title').text();
		const topic = $draftContainer.find('.draft-topic').text();
		const body = $draftContainer.find('.draft-body').text();

	
		$('#post-title').val(title);
		$('#post-topic').val(topic);
		$('#post-body').val(body);

	//remove the draft from the sidebar
		$draftContainer.remove();
		currentEditingDraft = $draftContainer;

	}
  
  


    function deleteDraft($buttonElement) {
      const $draftContainer = $buttonElement.closest('.draft');
      $draftContainer.remove();
	  draftCounter--;

    }

    function postDraft($buttonElement) {
      const $draftContainer = $buttonElement.closest('.draft');

      $draftContainer.remove();
	  
	  draftCounter--;
    }
	
	


});
  

