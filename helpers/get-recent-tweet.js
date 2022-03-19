const Twit_config = require("../config/twitter-config")

async function getRecentTweet(handle) {
    var twitParams = {
        exclude_replies: false,
        count: 20,
        screen_name: handle
    }

    const { data } = await Twit_config.get('statuses/user_timeline', twitParams)
    return Promise.resolve(data)
}
module.exports = getRecentTweet