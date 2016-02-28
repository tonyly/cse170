'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

    $('#delete').click(deleteMessage);
    $('#cancel').click(cancelMail);

}

function openMail(obj) {
    var message = $(obj);

    var mailID = message.find('.list-group-item').attr('id');
    var bodyText = message.attr('title');

    $('#message').text(bodyText);

    var mBody = $('#messageModal').find('#edit');
    mBody.addClass(mailID);
    console.log(mailID);
}

function deleteMessage(e) {
    e.preventDefault();

    if (confirm("Are you sure you want to permanently remove this message from your inbox?")) {
        var mailID = $('#messageModal').find('#edit').attr('class');
        var message = $("#" + mailID);


        var data = {type: "delete"};
        data.id = mailID.substr("message".length);

        $.post('/inbox', data, function (res) {});

        message.hide();
        $('#messageModal').modal('hide');
        $('#messageModal').find('#edit').removeClass(mailID);
    }

}

function cancelMail(e) {
    e.preventDefault();

    var mailID = $('#messageModal').find('#edit').attr('class');
    $('#messageModal').find('#edit').removeClass(mailID);
    $('#messageModal').modal('hide');

}