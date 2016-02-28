
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var home = require('./routes/home');
var friends = require('./routes/friends');
var myprofile = require('./routes/myprofile');
var settings = require('./routes/settings');
var inbox = require('./routes/inbox');
var friendprofile = require('./routes/friendprofile');
var challenge = require('./routes/challenge');
//var add = require('./routes/add');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
//app.get('/', index.userInfo);
//app.post('/', index.userCheck);
app.get('/home', home.view);
app.post('/home', home.addTask);
app.get('/home2', home.view2);
app.post('/home2', home.addTask);
app.get('/friends', friends.view);
app.post('/friends', friends.removeFriend);
app.get('/myprofile', myprofile.view);
app.post('/myprofile', myprofile.changeSkin);
app.get('/settings', settings.view);
app.post('/settings', settings.changeSettings);
app.get('/inbox', inbox.view);
app.post('/inbox', inbox.editMail);
app.get('/friendprofile/:friend', friendprofile.view);
app.get('/challenge/:friend', challenge.view);
//app.get('/add', add.addFriend);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
