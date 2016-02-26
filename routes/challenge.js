var data = require('../data.json');

exports.view = function(req, res){
	var friendName = req.params.friend;
	console.log(data);
	
    console.log(friendName);
    var passon = {};
    passon['friendname'] = friendName;
    passon['my_tasks'] = data.tasks;
    passon['friends_tasks'] = data.friend_tasks[friendName];
	res.render('challenge', passon);
};
