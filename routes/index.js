// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('index', data);
};

/*exports.userInfo = function(req, res) {
	var userID = req.params.user;
	res.json(data.users);
};

exports.userCheck = function(req, res) {
    var postData = req.body;

    var type = postData.type;
    if (type === "register") {
        console.log(postData);
        data.users.push(postData);
    }

}*/