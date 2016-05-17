var instagram = require("./development/js/instagram.js");
var twitter = require("./development/js/twitter.js");
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('arbor');

var app = express();
app.use(bodyParser.json());

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
	var allUserData = [];

	var tasks = users.map(function(user) {
		return function(callback) {
			var source = user.source;
			if (source === 'twitter') {
				// TODO: call twitter module and user name
				twitter.get_twitter_feeds(user.name , function(err , data){
					if(err){
						debug('Error retrieving twitter');
					}else{
						allUserData.push(data);
					}
					callback();
				});

			} else if (source === 'instagram') {
				instagram.get_recent_media(user.name, function(err, data) {
					if (err) {
						debug('Error retrieving Instagram', err);
					} else {
						debug('instagram called');
						allUserData.push(data);
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
