module.exports = function(req, res, next) {
	var model = req.options.model;

	if (!model) throw 'model baraye khat o meshy kar lazem ast';

	var Model = req._sails.models[model];

	Model.findOne(req.params.id).exec(function(err, record) {
		if (!record.malek) throw 'model be yek malek baraye sandiyat bakhshidan ehtiaj dare';

		if (record.malek !== req.userId)
			return res.status(401).send({
				error: 'Shoma nemitoni be inja dastresi dashte bashi ...'
			});

		req.record = record;
		next();
	});
};
