var mongo = require('mongodb');
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('cookingdb', server);
db.open(function (err, db) {
	if(!err){
		console.log('db is cooking...');
		db.collection('recepies', {strict:true}, function (err, collection) {
			if(err){
				console.log('There are no recepies! Creating sample recepies');
				populateDB();
			}
		});
	}else{
		console.log("error occured" + err);
	}

});

exports.findRecepieById = function findRecepieById (req, res) {
	var id = req.params.id;
	console.log('Retrieving Recepie: ' + id);
	db.collection('recepies', function (err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function (err, item) {
			res.send(item);
		});
	});
};

exports.findRecepiesAll = function findRecepiesAll (req, res) {
	console.log('Retrieving all Recepies');
	db.collection('recepies', function (err, collection){
		collection.find().toArray(function (err, items) {
			res.send(items);
		});
	});
};

exports.addRecepie = function addRecepie (req, res) {
	var recepie = req.body;
	console.log('Adding Recepie :' + JSON.stringify(recepie));
	db.collection('recepies', function (err, collection) {
		collection.insert(recepie, {safe: true}, function (err, result) {
			if(err){
				res.send({'error' : 'An error occured'});
			}else{
				console.log('Success: ', + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

exports.updateRecepie = function updateRecepie (req, res) {
	var id = req.params.id;
	var recepie = req.body;
	console.log('Updating Recepie :' + id);
	console.log(JSON.stringify(recepie));
	db.collection('recepies', function (err, collection) {
		collection.update({'_id': new BSON.ObjectID(id)}, recepie, {safe: true}, function (err, result) {
			if (err) {
                console.log('Error updating recepies: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(recepie);
            }
		});
	});
};

exports.deleteRecepie = function deleteRecepie (req, res) {
	var id = req.req.params.id;
	console.log('Deleting Recepie: ' + id);
	db.collection('recepies', function (err, collection) {
		collection.remove({'_id':new BSON.ObjectID(id)}, recipie, {safe : true}, function (err, result) {
			if(err){
				res.send({'error':'An error has occured :' + err});
			}else{
				console.log(result + 'document(s) are deleted');
				res.send(req.body);
			}
		});
	});
};

populateDB = function populateDB (argument) {
	var initialRecepies = [{
		name: "salad",
		ingredients: ["tomatos", "oil", "mashrooms"]
	}, {
		name: "pasta",
		ingredients: ["tomato sauce", "oil", "nudles"]
	}];
	db.collection('recepies', function (err, collection) {
		collection.insert(initialRecepies, {safe: true}, function (err, result) {
			if(err){
				console.log('Could not insert DB-Data!');
			}
		});
	});
};