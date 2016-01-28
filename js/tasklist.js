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






function updateProject(e) {
   var projectID = $('#project').val();
   $(projectID).animate({
      width: $('#width').val()
   });

   var newText = $('#description').val();
   $(projectID + " .project-description").text(newText);
}

function projectClick(e) {

	console.log("Project clicked");
	//prevent the page from reloading
	e.preventDefault();
    var projectTitle = $(this).find("p").text();
    var jumbotronHeader = $(".jumbotron h1");
    jumbotronHeader.text(projectTitle);
    console.log("Number of matching items: " + jumbotronHeader.length);
	//In an event handler, $(this) refers to
	// the object that triggered the vent
	$(this).css("background-color", "#7fff00");
	var containingProject = $(this).closest(".project");
    var description = $(containingProject).find(".project-description");
    var count = 0;
    if (description.length == 0) {
       $(containingProject).append("<div class='project-description'><p>Description of the project.</p></div>");
    } else {
    	$(this).fadeToggle();
    }
}