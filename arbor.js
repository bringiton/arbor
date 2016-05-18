var instagram = require("./development/js/instagram.js");
var twitter = require("./development/js/twitter.js");
var facebook = require("./development/js/facebook.js");
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('arbor');
var graph = require('fbgraph')

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
	var allUserData = { twitter : [] , instagram : [] , facebook : [] };

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
						var user_count = {}

						var result = { 	text : '',
									   	user : {screen_name : '' , name: '' , image : ''},
									   	create_date : '',
										media : ''};

						data.forEach(function(value){

							result.text= value['text'];
							result.create_date = value['created_at'];
							result.user.screen_name = value['user']['screen_name'];
							result.user.name = value['user']['name'];

							if(value.hasOwnProperty('extended_entities')){
								if(value['extended_entities'].hasOwnProperty('media')){
									result.media = value['extended_entities']['media'][0]["media_url_https"];
								}
						  	}

						  	if(value['user'].hasOwnProperty('profile_image_url_https')){
								result.user.image = value['user']["profile_image_url_https"];
						  	}

							if(users.hasOwnProperty(result.user.screen_name) && user_count[result.user.screen_name] < 20){
								users[result.user.screen_name].push(result);
								user_count[result.user.screen_name] += 1
							}else{
								users[result.user.screen_name] = [];
								users[result.user.screen_name].push(result);
								user_count[result.user.screen_name] = 1
							}

							result = { 	text : '',
									   	user : {screen_name : '' , name: '' , image: ''},
									   	create_date : '',
										media : ''};

						});

						debug(users);

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

						var result = { data : {tags:[] , image:'', caption : '' },
									   user : {screen_name : '' , name: '' , profile_pic:''},
									   'create_date' : ''};

						var users = {};

						data['data'].forEach(function(value){

							result.data.tags = value['tags'];
							result.data.image = value['images']['standard_resolution']['url'];
							result.data.caption = value['caption']['text'];
							result.user.screen_name = value['caption']['from']['username'];
							result.user.name = value['caption']['from']['full_name'];
							result.user.profile_pic = value['caption']['from']['profile_picture'];
							result.create_date = value['created_time'];

							if(users.hasOwnProperty(result.user.screen_name)){
								users[result.user.screen_name].push(result);
							}else{
								users[result.user.screen_name] = [];
								users[result.user.screen_name].push(result);
							}

							result = { data : {tags:[] , image:'', caption : '' },
									   user : {screen_name : '' , name: '' , profile_pic:''},
									   'create_date' : ''};
						});

						allUserData['instagram'].push(users);

					}
					callback();
				});
			}else if( source === 'facebook'){
				facebook.get_fb_posts(user.name , function(err,data){
					if(err){
						debug('Error retrieving facebook' , err)
					}else{
						debug('facebook called');
						debug(Object.prototype.toString.call(data));
						
						var fbdata = [];

						data['data'].forEach(function(value){
							fbdata.push(value);
						});

						allUserData['facebook'].push(fbdata);
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
