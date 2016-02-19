var data = require('../data.json');

exports.view = function(req, res){
	//console.log(data);
	console.log(data.user);
	res.render('myprofile', data);
};
