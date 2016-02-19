var data = require('../data.json');


exports.view = function(req, res){
	console.log(data);
	res.render('inbox', data);
};

/*
exports.view = function(req, res){
	var title = req.params.title;
	var msg = req.params.body;
	req.json()
}*/
