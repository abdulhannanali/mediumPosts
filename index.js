var medium = require("medium-sdk")

const NODE_ENV = process.env.NODE_ENV || "development"

if (NODE_ENV == "development") {
	require("./keys")
}

var mediumClient = new medium.MediumClient({
	clientId: process.env.MEDIUM_CLIENT_ID,
	clientSecret: process.env.MEDIUM_CLIENT_SECRET
})

mediumClient.setAccessToken(process.env.MEDIUM_ACCESS_TOKEN)
mediumClient.userId = process.env.MEDIUM_USER_ID

require("./lib/github-trending")(mediumClient).createTrendingPost()
