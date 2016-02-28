'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $('#skinEnter').hide();
    $('#skinBuy').hide();
    $('#skinBuyEnter').hide();

    $('#skinEnter').click(setSkin)
    $('#skinBuy').click(buySkin);
    $('#skinBuyEnter').click(buySetSkin);
    $('#skinCancel').click(cancelSkin);
    $('.close').click(cancelSkin);

    $('#logOut').click(logout);
}

function showDetails(obj) {
    var all = $(obj);
    var skin = all.find("img");

    var nameCost = skin.attr('alt').split('/');
    var avID = skin.attr('id');

    var curPoints = Number($('#userPoints').text().substr("Points: ".length));

    $('#avatarName').text(nameCost[0]);
    $('#avatarDescription').text(all.attr('title'));
    $('#avatarImg').attr('src', skin.attr('src'));
    $('#avatarName').addClass(avID);



    if (skin.attr('class') === 'locked') {
        if( curPoints < Number(nameCost[1])) {
            $('#skinBuy').removeClass("btn-primary");
            $('#skinBuy').addClass("btn-danger");
            $('#skinBuy').prop("disabled", true);

            $('#skinBuyEnter').removeClass("btn-success");
            $('#skinBuyEnter').addClass("btn-danger");
            $('#skinBuyEnter').prop("disabled", true);
        }
        else {
            $('#skinBuy').removeClass("btn-danger");
            $('#skinBuy').addClass("btn-primary");
            $('#skinBuy').prop("disabled", false);
            $('#skinBuyEnter').removeClass("btn-danger");
            $('#skinBuyEnter').addClass("btn-success");
            $('#skinBuyEnter').prop("disabled", false);
        }
        $('#avatarCost').text("Worth: " + nameCost[1] + " points");
        $('#skinEnter').hide();
        $('#skinBuyEnter').show();
        $('#skinBuy').show();
    }
    else {
        $('#avatarCost').text(" ");
        $('#skinEnter').show();
        $('#skinBuy').hide();
        $('#skinBuyEnter').hide();
    }
}

function setSkin(e) {
    e.preventDefault();
    var avID = $('#avatarName').attr('class');

    var avatar = $('#' + avID);

    var data = {"avURL": avatar.attr('src')};
    data.type = "set";
    $.post('/myprofile', data, function (res) {});

    $('#avatar').attr('src', avatar.attr('src'));
    $('#skinModal').modal('hide');
    $('#avatarName').removeClass(avID);
}

function buySkin(e) {
    e.preventDefault();
    var avID = $('#avatarName').attr('class');
    var avatar = $('#' + avID);
    var curPoints = Number($('#userPoints').text().substr("Points: ".length));

    var nameCost = avatar.attr('alt').split('/');
    var newPoint = curPoints - Number(nameCost[1]);

    if (confirm("Are you sure you want to buy " + nameCost[0] + " for " + nameCost[1] + " points?\n" +
            "Point Total AFTER Purchase: " + newPoint)) {

        var data = {
            "id": Number(avID.substr("skin".length)),
            "status": "unlocked",
            "points": newPoint
        };
        data.type = "buy";
        $.post('/myprofile', data, function (res) {});

        avatar.removeClass("locked");
        avatar.addClass("unlocked");
        $('#avatarName').removeClass(avID);
        $('#skinModal').modal('hide');
        $('#userPoints').text("Points: " + newPoint.toString());
    }
}

function buySetSkin(e) {
    e.preventDefault();
    var avID = $('#avatarName').attr('class');
    var avatar = $('#' + avID);
    var curPoints = Number($('#userPoints').text().substr("Points: ".length));

    var nameCost = avatar.attr('alt').split('/');
    var newPoint = curPoints - Number(nameCost[1]);

    if (confirm("Are you sure you want to buy and switch to " + nameCost[0] + " for " + nameCost[1] + " points?\n" +
            "Point Total AFTER Purchase: " + newPoint)) {

        var data = {
            "avURL": avatar.attr('src'),
            "id": Number(avID.substr("skin".length)),
            "status": "unlocked",
            "points": newPoint};
        console.log(data);
        data.type = "buySet";
        $.post('/myprofile', data, function (res) {});

        avatar.removeClass("locked");
        avatar.addClass("unlocked");
        $('#avatar').attr('src', avatar.attr('src'));
        $('#avatarName').removeClass(avID);
        $('#skinModal').modal('hide');
        $('#userPoints').text("Points: " + newPoint.toString());
    }

}

function cancelSkin(e) {
    e.preventDefault();
    var avID = $('#avatarName').attr('class');
    $('#avatarName').removeClass(avID);
}

function logout(e) {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "/";
    }
}