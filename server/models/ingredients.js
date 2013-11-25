var mongo = require('mongodb');
var http = require('http');
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;
//server
var server = new Server('localhost', 27017, {
	auto_reconnect: true
});

//database
var db = new Db('cookingdb', server);

//sample values for recepies
var initialIngredients = [{
	"name": "Bacon"
}, {
	"name": "Beef fat"
}, {
	"name": "Butter"
}, {
	"name": "Chicken fat"
}, {
	"name": "Cocoa butter"
}, {
	"name": "Coconut or coconut oil"
}, {
	"name": "Hydrogenated fats and oils"
}, {
	"name": "Lard"
}, {
	"name": "Palm or palm kernel oil"
}, {
	"name": "Powdered whole milk solids"
}, {
	"name": "Shortening"
}, {
	"name": "Suet"
}, {
	"name": "Tallow"
}, {
	"name": "Trans fat"
}, {
	"name": "Hard margarine"
}, {
	"name": "Hydrogenated fats and oils"
}, {
	"name": "Partially hydrogenated fats and oils"
}, {
	"name": "Shortening"
}, {
	"name": "Sodium"
}, {
	"name": "Baking powder"
}, {
	"name": "Baking soda"
}, {
	"name": "Brine"
}, {
	"name": "Celery salt"
}, {
	"name": "Garlic salt"
}, {
	"name": "Monosodium glutamate (MSG)"
}, {
	"name": "Onion salt"
}, {
	"name": "Salt"
}, {
	"name": "Soy sauce"
}, {
	"name": "Sugar"
}, {
	"name": "Brown sugar"
}, {
	"name": "Cane juice extract"
}, {
	"name": "Corn syrup"
}, {
	"name": "Honey"
}];


/*---- API
----------------------*/



exports.findIngredientById = function findIngredientById(req, res) {
	var id = req.params.id;
	console.log('Retrieving Ingredient: ' + id);
	db.collection('ingredients', function(err, collection) {
		collection.findOne({
			'_id': new BSON.ObjectID(id)
		}, function(err, item) {
			if (err) {
				res.send({
					'error': 'Could not get Ingredient with id: ' + id
				});
			} else {
				if (item) {
					res.send(item);
				} else {
					res.status(404);
					res.send({
						'error': 'There is no Ingredient with the id: ' + id + ' in the database'
					});
				}
			}
		});
	});
};

exports.findIngredientsAll = function findIngredientAll(req, res) {
	console.log('Retrieving all Ingredients');
	db.collection('ingredients', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.addIngredient = function addIngredient(req, res) {
	var ingredient = req.body;
	console.log('Adding Ingredient :' + JSON.stringify(ingredient));
	db.collection('ingredients', function(err, collection) {
		collection.insert(ingredient, {
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

exports.updateIngredient = function updateIngredient(req, res) {
	var id = req.params.id;
	var ingredient = req.body;
	//make sure the object's property "id" does not exist when the object is persisted.
	//It would conflict with the database id.
	if (ingredient._id) {
		delete ingredient._id;
	}
	console.log('Updating Ingredient :' + id);
	console.log(JSON.stringify(ingredient));
	id = new BSON.ObjectID(id);
	db.collection('ingredients', function(err, collection) {
		collection.update({
			'_id': id
		}, ingredient, {
			safe: true
		}, function(err, result) {
			if (err) {
				console.log('Error updating ingredient: ' + err);
				res.send({
					'error': 'An error has occurred'
				});
			} else {
				console.log('' + result + ' document(s) updated');
				res.send(ingredient);
			}
		});
	});
};

exports.deleteIngredient = function deleteIngredient(req, res) {
	var id = req.params.id;
	console.log('Deleting Ingredient: ' + id);
	db.collection('ingredients', function(err, collection) {
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
		console.log('db collecting ingredients...');
		db.collection('ingredients', {
			strict: true
		}, function(err, collection) {
			if (err) {
				console.log('There are no ingredients! Creating sample ingredients');
				populateIngredients(initialIngredients);
			}
		});
	} else {
		console.log("error occured" + err);
	}

});

/*---------- Populate DB
----------------------------------*/

populateIngredients = function populateIngredients(ingredients) {
	var message;
	db.collection('ingredients', function(err, collection) {
		collection.insert(ingredients, {
			safe: true
		}, function(err, result) {
			if (err) {
				console.log('Could not insert DB-Data!');
				message = {
					'error': true,
					'content': err
				};
			} else {
				message = {
					'error': false,
					'content': "Successfully added ingredient(s)! "
				};
			}
		});
	});
	return message;
};

/*--------- RESET DB
-------------------------------*/

exports.deleteIngredientsAll = function deleteIngredientsAll(req, res) {
	db.collection('ingredients', function(err, collection) {
		collection.remove(function(err, result) {
			if (err) {
				console.log('Error while deleting documents ' + err);
				res.render('index', {
					title: 'Smartkitchen Admin',
					message: {
						'error': true,
						'content': err
					}
				});
			} else {
				console.log(result + ' documents are deleted');
				//res.send(req.body);
				res.render('index', {
					title: 'Smartkitchen Admin',
					message: {
						'error': false,
						'content': 'Ingredients are deleted!'
					}
				});
			}
		});
	});
};

exports.makeRecepie = function makeRecepie(populate) {
	var randomRecepie = {};
	randomRecepie.name = "";
	randomRecepie.ingredients = [];
	var ingredientList = [];
	var ingr;
	var ingrNr;
	var numberOfIngr = 5;
	db.collection('ingredients', function(err, collection) {
		collection.find().toArray(function(err, ingredientList) {
			for (var i = 0; i < numberOfIngr; i++) {
				ingrNr = Math.floor(Math.random() * ingredientList.length);
				ingr = ingredientList[ingrNr];
				ingredientList.splice(ingrNr, 1);
				randomRecepie.name += ingr.name;
				if (i < numberOfIngr - 1) {
					randomRecepie.name += " ";
				}
				randomRecepie.ingredients.push(ingr);
			}
			populate(randomRecepie);
		});
	});
};