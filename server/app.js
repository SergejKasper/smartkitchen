var http = require('http'),
express = require('express'),
logger = require('./logger'),
recepies = require('./models/recepies'),
path = require('path');

var app = express();

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 };

app.configure(function (argument) {

	app.use(logger('was requested'));

	app.set('port', process.env.PORT || 4000);

	app.set('views', path.join(__dirname, '/views'));

	// Parse the body of each incoming request to be able to handle
	// file uploads, form posts and similar actions.
	app.use(express.bodyParser());

		//Add CORS Support

	app.use(allowCrossDomain);

	// internally and sets the file extension .ejs as default
	// extension, so that you do not need to specify it on each
	// single render call.
	app.set('view engine', 'ejs');

	// Detect tunneling of PUT and DELETE requests via POST requests
	// using the X-Http-Method-Override header.
	app.use(express.methodOverride());

	// Run the routes that were registered for the Express
	// application.
	app.use(app.router);

	// Provide the contents of the /public folder using a static
	// file server. As this line comes after the previous one,
	// routes have a higher precendence than static files. If you
	// need to change this, reverse the order of these two lines.
	app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function () {
  // Use Express' error handler module for detailed error messages
  // in development mode.
  app.use(express.errorHandler());

  // Add additional configuration here ...
});

app.configure('production', function () {
  // Add additional configuration here ...
});

app.get('/', function(req, res) {
	res.get('index', {title: 'Node Admin'});
});
app.get('/recepies', recepies.findRecepiesAll);

app.get('/recepies/:id', recepies.findRecepieById);

http.createServer(app).listen(app.get('port'), function (argument) {
  console.log('Express server listening on port ' + app.get('port'));
});