var instagram = require("./development/js/instagram.js");
var twitter = require("./development/js/twitter.js");
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('arbor');

var app = express();
app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

/*

Example request:
{
	"users": [
		{ "name": "srirams09", "source": "instagram" },
		{ "name": "sriram09", "source": "twitter" }
	]
}

*/

function getData(users, finalCallback) {
	var allUserData = { twitter : [] , instagram : []};

	var tasks = users.map(function(user) {
		return function(callback) {
			var source = user.source;
			if (source === 'twitter') {
				// TODO: call twitter module and user name
				twitter.get_twitter_feeds(user.name , function(err , data){
					if(err){
						debug('Error retrieving twitter');
					}
					else{
						
						var users = {};

						var result = { text : '',
									   user : {screen_name : '' , name: ''},
									   'create_date' : ''};
						data.forEach(function(value){

							result.text= value['text'];
							result.create_date = value['created_at'];
							result.user.screen_name = value['user']['screen_name'];
							result.user.name = value['user']['name'];
						  	
							if(users.hasOwnProperty(result.user.screen_name)){
								users[result.user.screen_name].push(result);
							}else{
								users[result.user.screen_name] = [];
								users[result.user.screen_name].push(result);
							}

						});

						allUserData['twitter'].push(users);

						
					}
					callback();
				});

			} else if (source === 'instagram') {
				instagram.get_recent_media(user.name, function(err, data) {
					if (err) {
						debug('Error retrieving Instagram', err);
					} else {
						debug('instagram called');
						debug(Object.prototype.toString.call(data));
						var result = { data : {tags:[] , link:'', caption : '' },
									   user : {screen_name : '' , name: '' , profile_pic:''},
									   'create_date' : ''};

						var users = {};

						data['data'].forEach(function(value){
							result.data.tags = value['tags'];
							result.data.link = value['link'];
							result.data.caption = value['caption']['text'];
							result.user.screen_name = value['caption']['from']['username'];
							result.user.name = value['caption']['from']['full_name'];
							result.user.profile_pic = value['caption']['from']['profile_picture'];
							result.create_date = value['created_time'];

							if(users.hasOwnProperty(result.user.screen_name)){
								debug(result);
								users[result.user.screen_name].push(result);
							}else{
								users[result.user.screen_name] = [];
								users[result.user.screen_name].push(result);
							}
						});

						allUserData['instagram'].push(users);

					}
					callback();
				});
			} else {
				debug("Unrecognised source:", source);
				callback();
			}			
		}
	});

	async.parallel(tasks, function(err) {
		finalCallback(err, allUserData);
	});
}

app.post('/retrieve', function(req, res) {
	debug(JSON.stringify(req.body));

	getData(req.body.users, function(err, data) {
		if (err) {
			res.status(500).send({
				error: err
			});
		} else {
			res.status(200).send({
				data: data
			});
		}
	});
});

var port = process.env.PORT || 8080;
app.listen(port);


//var twitter = require("./development/js/twitter.js")
