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
	$("#addbutton").click(function(e) {
		$('#taskform').show();
		$('#enter').show();
		//$('#enter').click(updateList);
		
	});

	// Add any additional listeners here
	// example: $("#div-id").click(functionToCall);
	
	$("#enter").click(updateList);
}

function updateList() {
	var add = $("#taskform").val();
	$('#tasklist').append('<li class="list-group-item">' + add + '</li>');
}






