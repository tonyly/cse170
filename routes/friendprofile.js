var data = require('../data.json');

exports.view = function(req, res){
	var friendName = req.params.friend;
	console.log(data);
	/*$(document).click(function(event) {
    var text = $(event.target).text();
});*/
    //var ftarr = data["friend_tasks"];
    //res.json(ftarr);
    // data.friendName = data.friend_tasks[friendInd].name;
    //var friendName = data.friend_tasks[friendInd].name;
    console.log(friendName);
    console.log(data.friend_tasks.tonylydoesntlie);
    //what we passed in the 2nd parameter is the model scope
	res.render('friendprofile', data.friend_tasks[friendName]);
};
