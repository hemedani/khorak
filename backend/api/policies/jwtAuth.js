var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
	if (!req.headers.authorization) return errDar();

	var token = req.headers.authorization.split(' ')[1];

	var payload = jwt.decode(token, config.TOKEN_SECRET);

	if (!payload.sub) return errDar();

	req.userId = payload.sub;
	next();
};

function errDar() {
	return req.status(401).send({
		error: 'Shoma hano neyamedi mian'
	});
}
