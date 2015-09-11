/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	tweet: function(req, res) {

		User.findOne(req.userId, function(err, user) {

			var peygham = req.body.peygham;
			var zamanRoz = req.body.zamanRoz;
			console.log(peygham);

			Post.create({
				peygham: peygham,
				zamanRoz: zamanRoz,
				postShode: false,
				malek: req.userId
			}).exec(function(err, post) {
				console.log('shod shod shod!!!', post, err);
				res.status(200).end();
			});
		});
	},

	posthayMan: function(req, res) {
		Post.find({
			malek: req.userId
		}, function(err, posts) {
			res.json(posts);
		});
	}

};
