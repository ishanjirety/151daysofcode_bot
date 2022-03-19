function getUsername(tweet) {
    return tweet.user.name.split(" ")[0].charAt(0).toUpperCase() + tweet.user.name.split(" ")[0].slice(1)
}
module.exports = getUsername