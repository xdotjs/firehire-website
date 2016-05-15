var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('joblist', ['joblist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/joblist', function(req, res) {
	console.log('received a get request');

	db.joblist.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/joblist', function(req, res) {
	console.log(req.body);
	db.joblist.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/joblist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.joblist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/joblist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.joblist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/joblist/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.joblist.findAndModify(
	{
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, location: req.body.location, phone: req.body.phone}},
		new: true
	}, function(err, doc) {
		res.json(doc);
	});
});

app.listen(3000);
console.log('server running on port 3000');