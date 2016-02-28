'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $('#saveButton').click(saveSettings);
}


function saveSettings(e) {
    e.preventDefault();
    var newName = $('#editName').val();
    var currentName = $('.allSettings').find('label').attr('class');

    if(newName !== currentName) {
        var data = {"name": newName};
        data.type = "name";
        $.post('/settings', data, function (res) {});

        alert("Username change saved!\n Old username: " + currentName +
              "\n New username: " + newName);

        $('.allSettings').find('label').removeClass(currentName);
        $('.allSettings').find('label').addClass(newName);
        $('#editName').attr('placeholder', newName);

    }

}