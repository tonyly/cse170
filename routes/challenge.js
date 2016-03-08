var data = require('../data.json');

exports.view = function(req, res){
	var challengeID = req.params.id;
    console.log(challengeID);

    var passon = {};
    /*passon['friendname'] = friendName;

    passon['my_tasks'] = [];
    passon['friends_tasks'] = [];

	var i;
	var j;

	for(i = 0; i < data.tasks.length; i++) {
	    if (data.tasks[i].challenge == 1)
		     passon['my_tasks'].push(data.tasks[i]);
    }

    for(j = 0; j < data.friend_tasks[friendName].tasks.length; j++) {

    	if(data.friend_tasks[friendName].tasks[j].challenge == 1) {
    		passon['friends_tasks'].push(data.friend_tasks[friendName].tasks[j]);

    	}
    }*/

    var i;
    for (i = 0; i < data.challenges.length; i++) {
        if (data.challenges[i].id == challengeID) {
            passon['user'] = data.user[0];
            passon['friend'] = data.friend_tasks[data.challenges[i].friend];
            passon['challenge'] = data.challenges[i];

            console.log(passon);
            break;
        }
    }

    console.log(passon);
	res.render('challenge', passon);
	//res.render('challenge', data);

};

exports.challengeEdit = function(req, res) {
    var postData = req.body;

    var type = postData.type;
    if (type === "done") {
      if (postData.id != undefined) {
        var id = postData.id;
        var i;

        for (i = 0; i < data.challenges.length; i++) {
          if (data.challenges[i].id == id) {
            data.challenges.splice(i, 1);
            var point = Number(data.user[0].points);
            var win = Number(data.user[0].wins);
            data.user[0].points = point + 100;
            data.user[0].wins =  win + 1;
            break;
          }
        }

        for (i = 0; i < data.challenges.length; i++) {
            data.challenges[i].id = i;
        }
      }
    }
    else if (type === "remove") {
        if (postData.id != undefined) {
            var id = postData.id;
            var i;

            for (i = 0; i < data.challenges.length; i++) {
                if (data.challenges[i].id == id) {
                    data.challenges.splice(i, 1);
                    break;
                }
            }

            for (i = 0; i < data.challenges.length; i++) {
                data.challenges[i].id = i;
            }
        }
    }
}
