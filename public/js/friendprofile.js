'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $('#challengeBTN').click(challengeClick);
    $('#request').click(sendRequest);

}

function challengeClick(e) {
    e.preventDefault();

    var numOfTasks = $('#tasklist li').length;

    if (numOfTasks === 0) {
        alert("Whoa!  It seems like your friend has no tasks!  Maybe you should wait before issuing "+
        "a challenge to them!");
    }
    else {
        alert("Challenge Sent! Waiting on reply from friend.");
    }
    ga('send', 'event', 'home', 'click');

}

function sendRequest(e) {
    e.preventDefault();

    var fName = $('#fName').text();

    if( confirm("Are you sure you want to send a friend request to " + fName + "?")) {
        var data = {
            "name": fName,
            "challenge": 0
        };
        data.type= "add";
        $.post('/friendprofile/' + fName, data, function(res) {});
        window.location.href = "/friends";
    }


}


/*function toggleRadio(obj) {
    var entry = $(obj).parent().text();
    var pieces = entry.split(/\s+/);

    if( confirm("Are you sure you want to remove " + pieces[0] + " from your friends list?")) {
        var data = { "name" : pieces[0]};
        data.type = "delete";
        $.post('/friends', data, function (res) {});

        $(obj).parent().hide();
    }

}*/