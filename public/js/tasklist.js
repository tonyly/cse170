'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

    $('#taskDeadlineFields').hide();
    $('#editDeadlineFields').hide();


    $('#taskDate').datepicker({
        todayHighlight: true,
        minDate: 0
    });


	// Add any additional listeners here
	// example: $("#div-id").click(functionToCall);
	
	$('#taskEnter').click(addList);
    $('#taskCancel').click(cancelAdd);

    $('#editCancel').click(cancelEdit);

    $('#delete').click(deleteTask);



}


function addList(e) {
    e.preventDefault();

	var name = $("#taskName").val();
	var date = $("#taskDate").val();
	var time = $("#taskTime").val();
	//  We need the length to assign an id
	var task = $("#taskList li").length;
    task = task + 1;
    var taskID = "task" + task;

    var deadline = $("#taskDeadlineCheck").prop('checked');

    var fields = ["• Task Name", "• Deadline Date", "• Deadline Time"];
    var warn = "You are missing the following field(s):";

    //for persistent data
    var data = {"id": 4,"name": name,"date": date,"time": time};
    $.post('/home', data, function (res) {

    });

    if (deadline) {
        if (name.length > 0 && date.length > 0 && time.length > 0) {
            $('#taskList').append('<a data-toggle="modal" data-target="#editModal' + task + '" id="taskObj" onclick="openEdit(this)" href="#">' +
                '<li class="list-group-item" id="' + taskID +'">' +
                '<h4 class="list-group-item-heading"><i class="glyphicon glyphicon-edit"></i> ' + name + '</h4>' +
                '<p>Deadline: ' + date + ', ' + time + '</p></li>' +
                '</a>');
            $("#taskModal").modal('hide');
            $("#taskName").val('');
            $("#taskDate").val('');
            $("#taskTime").val('');
            $("#taskDeadlineCheck").prop("checked", false);
            $('#taskDeadlineFields').hide();
        }
        else {
            if (name.length <= 0) {
                warn = warn + "\n" + fields[0];
            }
            if (date.length <= 0) {
                warn = warn + "\n" + fields[1];
            }
            if (time.length <= 0) {
                warn = warn + "\n" + fields[2];
            }
            alert(warn);
        }
    }
    else {
        if (name.length <= 0) {
            alert("You are missing a task name.");
        }
        else {
            $('#taskList').append('<a data-toggle="modal" data-target="#editModal' + task + '" id="taskObj" onclick="openEdit(this)" href="#">' +
                '<li class="list-group-item" id="' + taskID + '">' +
                '<h4 class="list-group-item-heading"><i class="glyphicon glyphicon-edit"></i> ' + name + '</h4>' +
                '<p>Deadline: None</p></li>' +
                '</a>');
            $("#taskModal").modal('hide');
            $("#taskName").val('');
            $("#taskDate").val('');
            $("#taskTime").val('');
            $("#taskDeadlineCheck").prop("checked", false);
            $('#taskDeadlineFields').hide();
        }
    }
}

function cancelAdd(e) {
    $("#taskModal").modal('hide');
    $("#taskName").val('');
    $("#taskDate").val('');
    $("#taskTime").val('');
    $("#taskDeadlineCheck").prop("checked", false);
    $('#taskDeadlineFields').hide();
}

function openEdit(obj) {
    var task = $(obj);

    var taskHead = task.find(".list-group-item-heading");
    var taskName = taskHead.text().substr(1);
    $("#editTask").val(taskName);

    var taskBody = task.find("p");
    var taskDead = taskBody.text().substr("Deadline: ".length);
    var taskDateTime = taskDead.split(", ");

    // If it says "None, there is no deadline."  Otherwise, DEADLINE.
    if(taskDead === "None") {
        $("#editDeadlineCheck").prop("checked", false);
        $('#editDeadlineFields').hide();
        $("#editDate").val('');
        $("#editTime").val('');
    }
    else {
        $("#editDeadlineCheck").prop("checked", true);
        $('#editDeadlineFields').show();

        $("#editDate").val(taskDateTime[0]);
        $("#editTime").val(taskDateTime[1]);
    }
    return;
}

function editTask(objID) {
    var obj = $("#"+objID.data);

    var taskHead = obj.find(".list-group-item-heading");


    var name = $("#editTask").val();
    var date = $("#editDate").val();
    var time = $("#editTime").val();
    var deadline = $("#editDeadlineCheck").prop('checked');

    console.log(taskHead);
    if (deadline) {

    }
    else {
        if(name.length <= 0) {
            alert("You are missing a task name.");
        }
        else {
            console.log(taskHead.html());
        }
    }
}

function deleteTask(e) {
    e.preventDefault();
    var obj = $(this);

    $('#editModal').on('show.bs.modal', function (e) {
        var $invoker = $(e.relatedTarget);
    });

    console.log(obj);
}


function cancelEdit(e) {
    $("#editModal").modal('hide');
    $("#editName").val('');
    $("#editDate").val('');
    $("#editTime").val('');
    $("#editDeadlineCheck").prop("checked", false);
    $('#editDeadlineFields').hide();

}

/* */
function toggleDeadline(classID, obj) {
	var input = $(obj);
	if( input.prop('checked')) {
		$(classID).show();
	}
	else {
		$(classID).hide();
	}

}