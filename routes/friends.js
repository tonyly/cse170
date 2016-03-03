var data = require('../data.json');

exports.view = function(req, res){
	res.render('friends', data);
};

exports.removeFriend = function(req, res) {
    var postData = req.body;

    var type = postData.type;
    if (type === "delete") {
        var i;
        for (i = 0; i < data.friends.length; i++) {
            if (data.friends[i].name === postData.name) {
                data.friends.splice(i, 1);
                break;
            }
        }
        data.friend_tasks[postData.name].friend = false;
    }

};