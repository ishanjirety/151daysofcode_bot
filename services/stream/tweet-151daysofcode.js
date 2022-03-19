const Twit_config = require("../../config/twitter-config")
const addAccountability = require("../add-accountability")

// @desc Webhook connection to monitor regular tweets
function StreamData() {
    var stream = Twit_config.stream('statuses/filter', { track: ['#151daysofcode'] })
    // Webhook connection
    stream.on('tweet', function (tweet) {
        // Detecting Tweet 
        console.log(`> New Tweet Detected : ${tweet.id_str}`)
        // Passing unique id to 
        if (tweet.text.toLowerCase().includes("keep me accountable")) return addAccountability(tweet)
        // Retweet(tweet.id_str, tweet)

    })
}

module.exports = StreamData