'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

    $('#done').click(doneChallenge);
    $('#leave').click(leaveChallenge);

    var deadDate = $('#challengeDate').text();
    var deadTime = $('#challengeTime').text();

    var givenDeadline = Date.parse(new Date(deadDate + " " + deadTime));
    var now = Date.parse(new Date());

    var deadOnOff = $('.challengeDetails').attr('id');
    var onOff = deadOnOff.substr('deadline'.length);
    var showDead = onOff === "On" ? true : false;

    if (showDead) {
      if (givenDeadline < now) {
        var time = document.getElementById('clockdiv');
        var dys = time.querySelector('.days');
        var hrs = time.querySelector('.hours');
        var min = time.querySelector('.minutes');
        var sec = time.querySelector('.seconds');

        dys.innerHTML = '0';
        hrs.innerHTML = '0';
        min.innerHTML = '0';
        sec.innerHTML = '0';
      }
      else {
        var deadline = new Date(now + (givenDeadline-now));
        initializeClock('clockdiv', deadline);

      }

    }
}


function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}


function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}


function doneChallenge(e) {
    e.preventDefault();

    if (confirm("Confirm that you're done with this challenge?")) {
        var challengeID = $('#challengeTask h2').attr('id');
        var data = {
          "id": challengeID
        };
        data.type = "done";
        $.post('/challenge/' + challengeID, data, function (res) {});
        alert("Congratulations!  You earned 100 points!");
        window.location.href = "/home";
    }
}


function leaveChallenge(e) {
    e.preventDefault();

    if (confirm("Are you sure you want to leave this challenge?")) {
        var challengeID = $('#challengeTask h2').attr('id');
        var data = {
            "id": challengeID
        };
        data.type = "remove";
        $.post('/challenge/' + challengeID, data, function (res) {});
        window.location.href = "/home";
    }
}