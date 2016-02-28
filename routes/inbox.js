var data = require('../data.json');


exports.view = function(req, res){
    // re-ID all messages
    if (data.messages.length != 0) {
        var i;
        for (i = 0; i < data.messages.length; i++) {
            data.messages[i].id = i + 1;
        }
    }

	res.render('inbox', data);
};

exports.editMail = function(req, res){
    var postData = req.body;

    var type = postData.type;
    if (type === "delete") {
        var i;
        for (i = 0; i < data.messages.length; i++) {
            if (data.messages[i].id == postData.id) {
                data.messages.splice(i, 1);
                break;

            }
        }
    }
}

/*
 exports.view = function(req, res){
 var title = req.params.title;
 var msg = req.params.body;
 req.json()
 }*/
