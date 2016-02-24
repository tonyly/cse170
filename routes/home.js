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
	} 
	else if (type === "delete") {
		if (postData.id != undefined) {
			var str = postData.taskName;
			var id = postData.id;
			var i;

			for (i = 0; i < data.tasks.length; i++) {
				if (data.tasks[i].id == id) {
					data.tasks.splice(i, 1);
					
				}
			}
		}

    }
    else if (type == "done"){
    	if (postData.id != undefined) {
			var str = postData.taskName;
			var id = postData.id;
			var i;

			for (i = 0; i < data.tasks.length; i++) {
				console.log(id + " " + data.tasks[i].id);
				if (data.tasks[i].id == id) {
					data.tasks.splice(i, 1);
					var point = data.user[0].points;
					data.user[0].points = point + 10; 
				}
			}
		}
    }
};

Array.prototype.removeValue = function(name, value) {
    var array = $.map(this, function(v, i) {
        return v[name] === value ? null : v;
    });
    this.length = 0;
    this.push.apply(this, array);
}