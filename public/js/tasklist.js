'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#taskform').hide();
	$('#enter').hide();
	$('#cancel').hide();
	$('#addbutton').click(function(e) {
		$('#addbutton').hide();
		$('#taskform').show();
		$('#enter').show();
		$('#cancel').show();
	});

	// Add any additional listeners here
	// example: $("#div-id").click(functionToCall);
	
	$('#enter').click(updateList);
	$('#cancel').click(cancelList);
}

function updateList() {
	var add = $("#taskform").val();
	if ( add.length != 0 ) {
	  $('#tasklist').append('<a onclick="taskEdit()" href="#"><li class="list-group-item"><i class="glyphicon glyphicon-edit"></i> ' + add + '</li></a>');
	}
}


/* Currently how to hide the text field */
function cancelList() {
	$('#taskform').hide();
	$('#enter').hide();
	$('#cancel').hide();
	$('#addbutton').show();
}

/* Placeholder alert to indicate that a task can be clicked */
function taskEdit() {
	alert("You've clicked on a task!  Unfortunately, we're working on this. D:");
}

/* Placeholder alert to indicate that the inbox can be clicked*/
function inboxClick() {
	alert("Inbox screen will open here!  If it existed... soon.")
}

/* Placeholder alert to indicate that the inbox can be clicked*/
function settingsClick() {
	alert("Settings screen will open here!  If it existed... soon.")
}