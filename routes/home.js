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
	data.tasks.push(postData);
};