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

}

function challengeClick(e) {
    e.preventDefault();

    ga('send', 'event', 'home', 'click');

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