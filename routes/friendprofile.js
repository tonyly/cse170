var data = require('../data.json');

exports.view = function(req, res){
	var friendName = req.params.friend;
	/*$(document).click(function(event) {
    var text = $(event.target).text();
});*/
    //var ftarr = data["friend_tasks"];
    //res.json(ftarr);
    // data.friendName = data.friend_tasks[friendInd].name;
    //var friendName = data.friend_tasks[friendInd].name;
    //console.log(friendName);
    //console.log(data.friend_tasks.tonylydoesntlie);
    //what we passed in the 2nd parameter is the model scope
	res.render('friendprofile', data.friend_tasks[friendName]);
};

exports.addFriend = function(req, res) {
	var postData = req.body;
	console.log(postData.name);

	var type = postData.type;
	if (type === "add") {
		postData.challenge = 0;
		data.friends.push(postData);
		data.friend_tasks[postData.name].friend = true;
		console.log(data);
	}
}