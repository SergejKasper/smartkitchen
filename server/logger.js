var logger = function(message) {
	return function(req, res, next) {
		console.log(req.url + ' ' + message);
		next();
	};
};


module.exports = logger;