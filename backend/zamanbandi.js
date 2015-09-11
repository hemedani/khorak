var sails = require('sails');
var Twit = require('twit');

sails.load(function() {
	setInterval(function() {
		barresiPost();
	}, 5000);
});

function barresiPost() {
	Post.find().where({
		zamanRoz: {
			'<': new Date()
		},
		postShode: false
	}).populate('malek').exec(function(err, posts) {
		console.log(posts);
		posts.forEach(function(post) {
			ersalTweet(post.malek.twitterToken, post.malek.twitterSecret, post.peygham, function() {
				berozResaniErsal(post);
			});
		});
	});
}

function ersalTweet(token, secret, peygham, cb) {
	var T = new Twit({
		consumer_key: config.TWITTER_KEY,
		consumer_secret: config.TWITTER_SECRET,
		access_token: token,
		access_token_secret: secret
	});

	T.post('statuses/update', {
		status: peygham
	}, function(err, data, response) {
		console.log('ba movafaghiyat ersal shod @!@', err);
		cb();
	});
}

function berozResaniErsal(post) {
	post.postShode = true;
	post.save(function () {
		console.log('post ersal shod va dige ferestade nemishe');
	});
}
