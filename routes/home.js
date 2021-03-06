// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	//data["testing"] = false;

	// re-ID all tasks
	if (data.tasks.length != 0) {
		var i;
		for (i = 0; i < data.tasks.length; i++) {
			data.tasks[i].id = i + 1;
		}
	}

	res.render('home', data);
};


/*exports.view2 = function(req, res) {
	data["testing"] = true;

	// re-ID all tasks
	if (data.tasks.length != 0) {
		var i;
		for (i = 0; i < data.tasks.length; i++) {
			data.tasks[i].id = i + 1;
		}
	}

	res.render('home', data);
};*/

exports.addTask = function (req, res) {
	var postData = req.body;

	var type = postData.type;
	if (type === "post") {
		if (postData.deadline === 'true') {
			postData.deadline = true;
		}
		else {
			postData.deadline = false;
		}
		data.tasks.push(postData);
	}
	else if (type === "delete") {
		if (postData.id != undefined) {
			var id = postData.id;
			var i;

			for (i = 0; i < data.tasks.length; i++) {
				if (data.tasks[i].id == id) {
					data.tasks.splice(i, 1);
					break;
				}
			}
		}

    }
    else if (type == "done"){
    	if (postData.id != undefined) {
			var id = postData.id;
			var i;

			for (i = 0; i < data.tasks.length; i++) {
				if (data.tasks[i].id == id) {
					data.tasks.splice(i, 1);
					var point = Number(data.user[0].points);
					data.user[0].points = point + 10;
					break;
				}
			}
		}
    }
    else if (type == "edit"){
    	if (postData.id != undefined) {
			var id = postData.id;
			var i;

			for (i = 0; i < data.tasks.length; i++) {
				if (data.tasks[i].id == id) {
                    data.tasks[i].name = postData.name;
					if (postData.deadline === 'true') {
						data.tasks[i].deadline = true;
					}
					else {
						data.tasks[i].deadline = false;
					}
                    data.tasks[i].date = postData.date;
                    data.tasks[i].time = postData.time;
					break;

				}
			}
		}
    }
};