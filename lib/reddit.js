const request = require("request")


var frontPageUrl = "https://reddit.com/.json"

/*
 * request the front page of the reddit
 */
exports.getFrontPage = function (callback) {
	request(frontPageUrl, function (error, response, body) {
		if (!error && response && response.body) {
			var payload = JSON.parse(response.body)

			callback(undefined, payload)
		}
		else {
			callback(error)
		}
	})
}

exports.submitFrontPagePost = function (callback) {

}

exports.getSubreddit = function (subreddit, callback) {

}