// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('home', data);
};


exports.showHome = function(req, res) {
	res.render('home');
};

exports.addTask = function (req, res) {
	var postData = req.body;
	var type = postData.type;
	if (type === "post") {
		data.tasks.push(postData);
	} else if (type === "delete") {
		if (postData.id != undefined) {
		console.log('deleting');
			data.tasks.splice(Number(postData.id), 1);
			console.log(data.tasks);
		}
	}
};