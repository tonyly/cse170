var data = require('../data.json');

exports.view = function(req, res){
	var friendName = req.params.friend;
	//console.log(data);
	
    //console.log(friendName);
    var passon = {};
    passon['friendname'] = friendName;
    //passon['my_tasks'] = data.tasks;
    //passon['friends_tasks'] = data.friend_tasks[friendName];

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
    }

	res.render('challenge', passon);

};
