var mongo = require('mongodb');
var http = require('http');
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;
	ingredients = require('./ingredients');

//server
var server = new Server('localhost', 27017, {
	auto_reconnect: true
});

//database
var db = new Db('cookingdb', server);

//sample values for recepies
var initialRecepies = [{
	name: "salad",
	ingredients: ["tomatos", "oil", "mashrooms"]
}, {
	name: "pasta",
	ingredients: ["tomato sauce", "oil", "nudles"]
}];


/*---- API
----------------------*/



exports.findRecepieById = function findRecepieById(req, res) {
	var id = req.params.id;
	console.log('Retrieving Recepie: ' + id);
	db.collection('recepies', function(err, collection) {
		collection.findOne({
			'_id': new BSON.ObjectID(id)
		}, function(err, item) {
			if (err) {
				res.send({
					'error': 'Could not get Recepie with id: ' + id
				});
			} else {
				if (item) {
					res.send(item);
				}else{
					res.status(404);
					res.send({'error': 'There is no Recepie with the id: ' + id +' in the database'});
				}
			}
		});
	});
};

exports.findRecepiesAll = function findRecepiesAll(req, res) {
	console.log('Retrieving all Recepies');
	db.collection('recepies', function(err, collection) {
		collection.find().toArray(function(err, items) {
			if (err) {
				res.send({
					'error': 'Could not get all Recepies'
				});
			} else {
			res.send(items);
			}
		});
	});
};

exports.addRecepie = function addRecepie(req, res) {
	var recepie = req.body;
	console.log('Adding Recepie :' + JSON.stringify(recepie));
	db.collection('recepies', function(err, collection) {
		collection.insert(recepie, {
			safe: true
		}, function(err, result) {
			if (err) {
				res.send({
					'error': 'An error occured'
				});
			} else {
				console.log('Success: ', +JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

exports.updateRecepie = function updateRecepie(req, res) {
	var id = req.params.id;
	var recepie = req.body;
	//make sure the object's property "id" does not exist when the object is persisted.
	//It would conflict with the database id.
	if (recepie._id) {
		delete recepie._id;
	}
	//var base64Data = recepie.picture.replace(/^data:image\/png;base64,/, "");
	//var dataBuffer = new Buffer(base64Data, 'base64');
	//recepie.picture = dataBuffer.toString();
	console.log('Updating Recepie :' + id);
	console.log(JSON.stringify(recepie));
	id = new BSON.ObjectID(id);
	db.collection('recepies', function(err, collection) {
		collection.update({'_id': id}, recepie, {safe: true}, function(err, result) {
			if (err) {
				console.log('Error updating recepies: ' + err);
				res.send({
					'error': 'An error has occurred'
				});
			} else {
				console.log('' + result + ' document(s) updated');
				res.send(recepie);
			}
		});
	});
};

exports.deleteRecepie = function deleteRecepie(req, res) {
	var id = req.params.id;
	console.log('Deleting Recepie: ' + id);
	db.collection('recepies', function(err, collection) {
		collection.remove({
			'_id': new BSON.ObjectID(id)
		}, {
			safe: true
		}, function(err, result) {
			if (err) {
				res.send({
					'error': 'An error has occured :' + err
				});
			} else {
				console.log(result + 'document(s) are deleted');
				res.send(req.body);
			}
		});
	});
};

/*---------- SETUP DB
-----------------------------------*/
db.open(function(err, db) {
	if (!err) {
		console.log('db is cooking...');
		db.collection('recepies', {
			strict: true
		}, function(err, collection) {
			if (err) {
				console.log('There are no recepies! Creating sample recepies');
				var message = "";
				for (var i = 0; i < 5; i++) {
					//add some sample recepies
					ingredients.makeRecepie(populateRecepies);
				}
			}
		});
	} else {
		console.log("error occured" + err);
	}

});

exports.addRandomRecepie = function(req, res) {
	var message = ingredients.makeRecepie(populateRecepies);
	res.render('index', {
		title: 'Smartkitchen Admin',
		message: message
	});
};

/*---------- Populate DB
----------------------------------*/

populateRecepies = function populateRecepies(recepies) {
	var message;
	db.collection('recepies', function(err, collection) {
		collection.insert(recepies, {
			safe: true
		}, function(err, result) {
			if (err) {
				console.log('Could not insert DB-Data!');
				message = {'error': true, 'content': err};
			}else{
				message = {'error': false, 'content': "Successfully added recepie(s)! "};
			}
		});
	});
	return message;
};

/*--------- RESET DB
-------------------------------*/

exports.deleteRecepiesAll = function deleteRecepiesAll(req, res) {
	db.collection('recepies', function(err, collection) {
		collection.remove(function(err, result) {
			if (err) {
				console.log('Error while deleting documents '+ err);
				res.render('index', {
					title: 'Smartkitchen Admin',
					message: {'error': true, 'content': err}
				});
			} else {
				console.log(result + ' documents are deleted');
				//res.send(req.body);
				res.render('index', {
					title: 'Smartkitchen Admin',
					message: {'error': false, 'content': 'Recepies are deleted!'}
				});
			}
		});
	});
};