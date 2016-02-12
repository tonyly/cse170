'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#taskName').hide();
	$('#enter').hide();
	$('#cancel').hide();
	$('#addbutton').click(function(e) {
		$('#taskName').show();
		$('#enter').show();
		$('#cancel').show();
	});

	// Add any additional listeners here
	// example: $("#div-id").click(functionToCall);
	
	$('#enter').click(updateList);
	$('#cancel').click(cancelList);
}

function updateList() {
	var name = $("#taskName").val();
	var date = $("#taskDate").val();
	var time = $("#taskTime").val();
	//  We need the length to assign an id
	var task = $("#tasklist li").length;

	console.log(task);

	if(name.length <= 0) {
	  alert("Please input a task name.");
	}
	else {
	  $('#tasklist').append('<a data-toggle="modal" data-target="#editModal" href="#">' + '<li' +
		 ' class="list-group-item">' +
			'<h4 class="list-group-item-heading"><i class="glyphicon glyphicon-edit"></i> ' + name + '</h4>' +
			'<p>Deadline: ' + date + ', ' + time + '</p></li>' +
			'</a>');
	}
}


/* Currently how to hide the text field */
function cancelList() {
	/*$('#taskform').hide();
	$('#enter').hide();
	$('#cancel').hide();
	$('#addbutton').show();*/
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