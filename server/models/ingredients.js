exports.makeRecepie = function makeRecepie() {
		var ingredientList = ["Bacon",
		"Beef fat",
		"Butter",
		"Chicken fat",
		"Cocoa butter",
		"Coconut or coconut oil",
		"Hydrogenated fats and oils",
		"Lard",
		"Palm or palm kernel oil",
		"Powdered whole milk solids",
		"Shortening",
		"Suet",
		"Tallow",
		"Trans fat",
		"Hard margarine",
		"Hydrogenated fats and oils",
		"Partially hydrogenated fats and oils",
		"Shortening",
		"Sodium",
		"Baking powder",
		"Baking soda",
		"Brine",
		"Celery salt",
		"Garlic salt",
		"Monosodium glutamate (MSG)",
		"Onion salt",
		"Salt",
		"Soy sauce",
		"Sugar",
		"Brown sugar",
		"Cane juice extract",
		"Corn syrup",
		"Honey"
	];
	var randomRecepie = {};
	randomRecepie.name = "";
	randomRecepie.ingredients = [];
	var ingr;
	var ingrNr;
	var numberOfIngr = 5;
	for (var i = 0; i < numberOfIngr; i++) {
		ingrNr = Math.floor(Math.random() * ingredientList.length);
		ingr = ingredientList[ingrNr];
		ingredientList.splice(ingrNr, 1);
		randomRecepie.name += ingr;
		if (i< numberOfIngr - 1) {
			randomRecepie.name +=" ";
		};
		randomRecepie.ingredients.push(ingr);
	}
	return randomRecepie;
};

/* getRandomWord = function() {
	var randomword = "";
	http.get("http://randomword.setgetgo.com/get.php", function(res) {
	var data = "";
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			console.log('BODY: ' + chunk);
			data += chunk;
		}).on('end', function() {
			console.log("Data: " + data);
			randomword = data;
    	});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
	console.log("Word: " + randomword);
	return randomword;
};*/