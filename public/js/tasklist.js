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
    $('#editDate').datepicker({
        todayHighlight: true,
        minDate: 0
    });
    $('#taskTime').timepicker({
        minuteStep: 5
    });
    $('#editTime').timepicker({
        minuteStep: 5
    });
    $('#taskTime').val('');


    // Add any additional listeners here
    // example: $("#div-id").click(functionToCall);
    
    $('#taskEnter').click(addList);
    $('#taskCancel').click(cancelAdd);

    $('#editEnter').click(editTask);
    $('#editCancel').click(cancelEdit);

    $('#delete').click(deleteTask);
    $('#done').click(doneTask);
}


/*
 * Function to add new tasks to lists.  It takes the values found in fields and
 * appends a new list item with appropriate information.  A new data json is
 * created and stored into the file
 */
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
    if (!deadline) {
        time = '';
    }

    var fields = ["• Task Name", "• Deadline Date", "• Deadline Time"];
    var warn = "You are missing the following field(s):";

    var today = new Date();
    var month = today.getMonth() + 1;
    var mm = month < 10 ? "0" + month.toString() : month.toString();
    var dd =  today.getDate().toString();
    var yyyy = today.getFullYear().toString();
    var createDate = mm + "/" + dd + "/" + yyyy;

    var curHour = today.getHours();
    var hh = curHour === 0 ? "12" : (curHour > 12 ? (curHour - 12).toString() : curHour.toString());
    var min = today.getMinutes().toString();
    var meridiem = curHour < 12 ? " AM" : " PM";
    var createTime = hh + ":" + min + meridiem;

    var data = {
        "id": task,
        "name": name,
        "deadline": deadline,
        "date": date,
        "time": time,
        "created": createDate + ", " + createTime
    };
    data.type= "post";

    if (deadline) {
        if (name.length > 0 && date.length > 0 && time.length > 0) {
            $('#taskList').append('<a id="taskObj" onclick="openEdit(this)" href="#">' +
                '<li class="list-group-item" id="' + taskID +'">' +
                '<h4 class="list-group-item-heading"><i class="glyphicon glyphicon-edit"></i> ' + name + '</h4>' +
                '<p>Deadline: ' + date + ', ' + time + '</p></li>' +
                '</a>');
            $('#taskModal').modal('hide');
            $('#taskName').val('');
            $('#taskDate').val('');
            $('#taskTime').val('');
            $('#taskDeadlineCheck').prop("checked", false);
            $('#taskDeadlineFields').hide();

            $.post('/home', data, function(res) {});
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
            $('#taskList').append('<a id="taskObj" onclick="openEdit(this)" href="#">' +
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

            $.post('/home', data, function(res) {});
        }
    }
}


/*
 * Function to clean up after CANCEL is hit for the ADD TASK MODAL
 */
function cancelAdd(e) {
    $('#taskModal').modal('hide');
    $('#taskName').val('');
    $('#taskDate').val('');
    $('#taskTime').val('');
    $('#taskDeadlineCheck').prop("checked", false);
    $('#taskDeadlineFields').hide();
}


/*
 * Function to display appropriate information in the EDIT TASK MODAL;
 * This is where the taskID is injected into a class where selecting options
 * like DONE, DELETE, and SAVE are able to locate the appropriate list item
 * to change.
 */
function openEdit(obj) {
    var task = $(obj);

    var taskID = task.find(".list-group-item");
    var taskHead = task.find(".list-group-item-heading");
    var taskName = taskHead.text().substr(1);
    $('#editTask').val(taskName);

    var taskBody = task.find("p");
    var taskDead = taskBody.text().substr("Deadline: ".length);
    var taskDateTime = taskDead.split(", ");

    // If it says "None, there is no deadline."  Otherwise, DEADLINE.
    if(taskDead === "None") {
        $('#editDeadlineCheck').prop("checked", false);
        $('#editDeadlineFields').hide();
        $('#editDate').val('');
        $('#editDate').attr("placeholder", "Date");
        $('#editTime').val('');
        $('#editTime').attr("placeholder", "Time");

    }
    else {
        $('#editDeadlineCheck').prop("checked", true);
        $('#editDeadlineFields').show();

        $('#editDate').val(taskDateTime[0]);
        $('#editTime').val(taskDateTime[1]);
    }

    var taskHolder = $('#editModal').find('#edit');
    taskHolder.addClass(taskID.attr('id'));
}


/* If a person edits an entire task, though, the creation date would have to change, but
 * I'm lazy, so no.
 *
 * Function to EDIT the task; using the injected taskID, the modal locates the task that
 * launched it and proceeds to gather all the appropriate information from the fields to
 * reflect the edits in the list view.
 * */
function editTask(e) {
    e.preventDefault();

    var taskID = $('#editModal').find('#edit').attr('class');
    var task = $('#' + taskID);
    var taskTitle = task.find('.list-group-item-heading');

    var newTitle = $('#editTask').val();

    taskTitle.html('<i class="glyphicon glyphicon-edit"></i> ' + newTitle);

    var deadline = $('#editDeadlineCheck').prop('checked');

    var taskBody = task.find("p");
    var newDate = $('#editDate').val();
    var newTime = $('#editTime').val();


    if (deadline) {
        taskBody.text("Deadline: " + newDate + ", " + newTime);
    }
    else {
        taskBody.text("Deadline: None");
        newDate = "";
        newTime = "";
    }

    var data = {
        "id": taskID.substr("task".length),
        "name": newTitle,
        "deadline": deadline,
        "date": newDate,
        "time": newTime
    };
    data.type = "edit";
    $.post('/home', data, function (res) {});

    $('#editModal').find('#edit').removeClass(taskID);
    $('#editModal').modal('hide');
}


/*
 * Function to DELETE the task; using the injected taskID, the modal locates the task that
 * launched it to remove
 *
 * TODO: Find some way to get it to remove from the json because that isn't working
 */
function deleteTask(e) {
    e.preventDefault();

    var taskID = $('#editModal').find('#edit').attr('class');
    var task = $('#' + taskID);

    if (confirm("Are you sure you want to delete this task?")) {

      var data = {type: "delete"};

      // taskID
      data.id = taskID.substr("task".length);

      //add new
      var taskHead = task.find(".list-group-item-heading");
      var taskName = taskHead.text().substr(1);
      console.log("taskName: " + taskName);
      // end new

      console.log(taskID.substr("task".length));
      data.taskName = taskHead.text().substr(1);
      $.post('/home', data, function (res) {});

      $("#editModal").modal('hide');
    }

    task.hide();
    $('#editModal').find('#edit').removeClass(taskID);
    $('#editModal').modal('hide');
}


/*
 * Function to FINISH the task; using the injected taskID, the modal locates the task that
 * launched it to remove it from the list and to increment the user's points by the appropriate
 * amount of points.
 *
 * TODO: Still have yet to increment points or figured out how to remove a task from json or to
 *       edit the JSON information
 */
function doneTask(e) {
    e.preventDefault();
    var obj = $(this);

    var taskID = $('#editModal').find('#edit').attr('class');
    var task = $('#' + taskID);

    var data = {type: "done"};

    // taskID
    data.id = taskID.substr("task".length);

    //add new
    var taskHead = task.find(".list-group-item-heading");
    var taskName = taskHead.text().substr(1);
    console.log("taskName: " + taskName);
    // end new

    console.log(taskID.substr("task".length));
    data.taskName = taskHead.text().substr(1);
    $.post('/home', data, function (res) {});

    task.hide();
    $("#editModal").modal('hide');
    $("#editName").val('');
    $("#editDate").val('');
    $("#editTime").val('');
    $("#editDeadlineCheck").prop("checked", false);
    $('#editDeadlineFields').hide();
}


/*
 * Function to clean up the EDIT MODAL after CANCEL is hit
 */
function cancelEdit(e) {
    var taskID = $('#editModal').find('#edit').attr('class');
    $('#editModal').find('#edit').removeClass(taskID);
    $("#editModal").modal('hide');
    $("#editName").val('');
    $("#editDate").val('');
    $("#editTime").val('');
    $("#editDeadlineCheck").prop("checked", false);
    $('#editDeadlineFields').hide();
}

/*
 * Function to show and hide the DATE and TIME fields in the modal when the
 * DEADLINE? checkbox is toggled
 */
function toggleDeadline(classID, obj) {
	var input = $(obj);
	if( input.prop('checked')) {
		$(classID).show();
	}
	else {
		$(classID).hide();
	}

}