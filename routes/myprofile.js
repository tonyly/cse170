var data = require('../data.json');

exports.view = function(req, res){
	res.render('myprofile', data);
};

exports.changeSkin = function (req, res) {
	var postData = req.body;

	var type = postData.type;
	if (type === "set") {
		data.user[0].avatarURL = postData.avURL;
	}
	else if (type === "buy"){
		if (postData.id != undefined) {
			var id = postData.id;
			var i;

			for (i = 0; i < data.potatoskins.length; i++) {
				if (data.potatoskins[i].id == id) {
					data.potatoskins[i].status = postData.status;
					data.user[0].points = Number(postData.points);
					break;
				}
			}
		}
	}
	else if (type === "buySet") {
		data.user[0].avatarURL = postData.avURL;
		if (postData.id != undefined) {
			var id = postData.id;
			var i;

			for (i = 0; i < data.potatoskins.length; i++) {
				if (data.potatoskins[i].id == id) {
					data.potatoskins[i].status = postData.status;
					data.user[0].points = Number(postData.points);
					break;
				}
			}
		}
	}
};