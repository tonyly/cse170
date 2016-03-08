'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})


/*
 * Function that is called when the document is ready.
 */
function initializePage() {

    $('#register').click(signUp);
    $('#login').click(signIn);
    $('#cancelPass').click(cancelForget);
    $('#getPass').click(rememberPassword);
}




function cancelForget(e) {
    e.preventDefault();
    $('#forgetEmail').val('');
}

function rememberPassword(e) {
    alert("Sorry, but I don't remember your password!");
}

function signUp(e) {

    var accept = $('#checkUp').prop('checked');
    //var ePiece = $('#newEmail').val().split(/(@|\.)/g);
    var ePiece = $('#newEmail').val().split(/(@)/g);

    if (accept && ($('#newName').val().length > 0) && ($('#newPass').val().length > 0) &&
    //    (ePiece.length === 5)) {
        (ePiece.length === 3)) {
      var newUser = {"name": "Meep"};
      $.get(newUser, checkUsers);
    }
}

function signIn(e) {
    var newUser = {"name": "Meep"};
    $.get(newUser, checkUsers);
}

function checkUsers(users) {
    var valid = true;
    console.log(users);

    var email = $('#newEmail').val();
    var name = $('#newName').val();
    var pass = $('#newPass').val();

    var i;
    for (i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            alert("This email already has an account!");
            valid = false;
            break;
        }
    }

    if (valid) {
        var data = {
            "id": users.length + 1,
            "username": name,
            "email": email,
            "password": pass
        };
        data.type = "register";
        $.post('/', data, function(res) {});
    }

}