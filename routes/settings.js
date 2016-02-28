var data = require('../data.json');

exports.view = function(req, res){
	res.render('settings', data);
};

exports.changeSettings = function(req, res) {
    var postData = req.body;

    var type = postData.type;
    if (type === "name") {
        data.user[0].username = postData.name;
    }
};