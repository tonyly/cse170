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
    $('#deadlinefields').hide();
	$('#addbutton').click(function(e) {
		$('#taskName').show();
		$('#enter').show();
		$('#cancel').show();
	});


    $('#taskDate').datepicker({
        todayHighlight: true,
        minDate: 0
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

    var deadline = $("#taskDeadlineCheck").prop('checked');

	var fields = ["task name", "date", "time", "for the deadline"];

	console.log(task);

	var data = {"id": 4,"name": name,"date": date,"time": time};
	//var key = 'tasks';
	//addtoStorage(key,data);

	$.post('/home', data, function (res) {

	});
	
	// Not understanding what data is. Cant use PHP in javascript?
	/*
	<?php
	  $data[] = $_POST['data'];

      $inp = file_get_contents('../../data.json');
	  $tempArray = json_decode($inp);
	  array_push($tempArray, $data);
	  $jsonData = json_encode($tempArray);
	  file_put_contents('../../data.json', $jsonData);
	?>
	*/
	

	/*if (deadline) {


	}
	else if (name.length <= 0){
		alert("Please input a " + fields[0] + ".");
	}
	else {
		$('#tasklist').append('<a data-toggle="modal" data-target="#editModal" href="#">' + '<li' +
			' class="list-group-item">' +
			'<h4 class="list-group-item-heading"><i class="glyphicon glyphicon-edit"></i> ' + name + '</h4>' +
			'<p>Deadline: None</p></li>' +
			'</a>');
	}*/

    // TODO: CHANGE THIS LATER
	if (name.length <= 0) {
	  alert("Please input a task name.");
	}
	else if (deadline) {
      if (date.length <= 0 && time.length <= 0) {
          alert("Please input a date and time for the deadline.");
      }
      else if (date.length <= 0) {
          alert("Please input a date for the deadline.");
      }
      else if (time.length <= 0) {
          alert("Please input a time for the deadline.");
      } else {

        $('#tasklist').append('<a data-toggle="modal" data-target="#editModal" href="#">' + '<li' +
            ' class="list-group-item">' +
            '<h4 class="list-group-item-heading"><i class="glyphicon glyphicon-edit"></i> ' + name + '</h4>' +
            '<p>Deadline: ' + date + ', ' + time + '</p></li>' +
            '</a>');
      }
	}
    else {
      $('#tasklist').append('<a data-toggle="modal" data-target="#editModal" href="#">' + '<li' +
          ' class="list-group-item">' +
          '<h4 class="list-group-item-heading"><i class="glyphicon glyphicon-edit"></i> ' + name + '</h4>' +
           '<p>Deadline: None</p></li>' +
          '</a>');

    }
}

/*
//addto storage?
function addtoStorage(key, data) {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem(key)) {
            console.log("Local Storage stuff" + localStorage.getItem(key));
            var olddata = JSON.parse(localStorage.getItem(key));
            var newdata = null;
            if(olddata instanceof Array){
                olddata.push(data);
                newdata = olddata;
            }else if(data instanceof Array || !(data instanceof Object) || !(olddata instanceof Object)){
                newdata = [olddata, data];
            }else if(data instanceof Object && olddata instanceof Object){
                newdata = $.extend(olddata, data);
            }
            var dataJSON = JSON.stringify(newdata);
            localStorage.setItem(key, dataJSON);
        }
        else {
            var dataJSON = JSON.stringify(data);
            localStorage.setItem(key, dataJSON);
        }
    }
    else {
        console.log("You don't have storage capabilities. Sorry. Next time improve your browser.");
    }
}*/

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

/* */
function toggleDeadline(classID, obj) {
	var input = $(obj);
    console.log(input);
	if( input.prop('checked')) {
		$(classID).show();
	}
	else {
		$(classID).hide();
	}

}