var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('friends', data);
};

/*
exports.showHome = function(req, res) {
	res.render('home');
}*/