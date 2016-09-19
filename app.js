var express = require('express');
var app = express();
var http = require('http');
var request = require('request');
var Promise = require('promise');
var url = 'http://private-3cf1dd-holonetcards.apiary-mock.com/getcards';

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.get('/todocards/cards', function(req, res) {
	var fabricPromise = new Promise(function(resolve, reject) {
		request(url, function(error, response, body) {
			setTimeout(function() {
							if (!error && response.statusCode == 200) {
											body = JSON.parse(body);
											return resolve(body); // Show the HTML for the Google homepage.
							}
							if (error) {
								return reject(error);
							}
			}, 5000);
		});
	});

	var fitPromise = new Promise(function(resolve, reject) {
		request(url, function(error, response, body) {
			setTimeout(function() {
							if (!error && response.statusCode == 200) {
											body = JSON.parse(body);
											return resolve(body); // Show the HTML for the Google homepage.
							}
							if (error) {
								return reject(error);
							}
			}, 5000);
		});
	});

	var phrPromise = new Promise(function(resolve, reject) {
		request(url, function(error, response, body) {
			setTimeout(function(){
							if (!error && response.statusCode == 200) {
											body = JSON.parse(body);
											return resolve(body); // Show the HTML for the Google homepage.
							}
							if (error) {
								return reject(error);
							}
			}, 5000);
		});
	});


	Promise.all([phrPromise, fitPromise, fabricPromise]).then(function(values)  {
		res.send(JSON.stringify(values));
	});

});


app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});