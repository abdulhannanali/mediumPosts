const trending = require("github-trending")

module.exports = function (mediumClient) {

	function createTrendingPost (language, callback) {
		if (!language) {
			trending(function (error, repositories) {
				if (error) {
					callback(error)
				}
				else {
					mediumRepoStory(undefined, repositories, function (error, post) {
						if (error) {
							console.log(error)
						}
						else {
							console.log(post)
						}
					})
				}
			})
		}
	}

	function mediumRepoStory (language, repositories, callback) {
		var mediumPost = {}

		var title = "Trending repos on Github today"

		if (language) {
			title += " for " + language
		}

		var content = `Here are  repositories from ${language ? language: "all langauges"} on Github. Listed by the most number of stars 🌟🌟🌟.`
		content += "\n"

		content +=  repositories.map(function (value, index, array) {

			var contributorsLinks = value.contributors.map(function (value) {
				return `[${value}](https://github.com/${value})`
			})

			return (
				`## [${value.owner}/${value.title}](${value.url})\n` +
				`🌟 ${parseInt(value.star)}\n` + 
				`> ${value.description}\n` + 
				`#### The main contributors for thie repo are **${contributorsLinks.join(", ")}**\n` +
				`**${value.language}**`
			)
		}).join("\n\n")

		content += "\n---------------------------------------\n"
		content += `\n*These repositories are automatically generated using the awesome [Medium API](https://github.com/Medium/medium-api-docs) and scraping [Trending on Github](https://github.com/trending) page.*`

		mediumClient.createPost({
			userId: mediumClient.userId,
			title: title,
			content: content,
			contentFormat: "markdown",
			tags: ["programming", "github", "open source", "technology"],
			publishStaus: "public",
			licence: "public-domain"
		}, callback) 
	}

	return {
		createTrendingPost: createTrendingPost
	}
}