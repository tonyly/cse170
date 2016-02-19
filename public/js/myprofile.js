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

    $('#skinEnter').click(setSkin)
    $('#skinBuy').click(buySkin);
    $('#skinCancel').click(cancelSkin);
    $('.close').click(cancelSkin);
}

function showDetails(obj) {
    var all = $(obj);
    var skin = all.find("img");

    var nameCost = skin.attr('alt').split('/');
    var avID = skin.attr('id');

    $('#avatarName').text(nameCost[0]);
    $('#avatarDescription').text(all.attr('title'));
    $('#avatarImg').attr('src', skin.attr('src'));
    $('#avatarName').addClass(avID);


    if (skin.attr('class') === 'locked') {
        $('#avatarCost').text("Worth: " + nameCost[1] + " points");
        $('#skinEnter').hide();
        $('#skinBuy').show();
    }
    else {
        $('#avatarCost').text(" ");
        $('#skinEnter').show();
        $('#skinBuy').hide();
    }
}

function setSkin(e) {
    e.preventDefault();
    var avID = $('#avatarName').attr('class');

    var avatar = $('#' + avID);

    $('#avatar').attr('src', avatar.attr('src'));
    $('#skinModal').modal('hide');
    $('#avatarName').removeClass(avID);
}

function buySkin(e) {
    e.preventDefault();
    var avID = $('#avatarName').attr('class');

    var avatar = $('#' + avID);
    avatar.removeClass("locked");
    avatar.addClass("unlocked");
    $('#avatarName').removeClass(avID);
    $('#skinModal').modal('hide');
}

function cancelSkin(e) {
    e.preventDefault();
    var avID = $('#avatarName').attr('class');
    $('#avatarName').removeClass(avID);
}