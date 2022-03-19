const { dbFirebase } = require("./firebase-init")

async function addUser(tweet) {
    const collectionRef = dbFirebase.collection("accountability")
    const dateTime = new Date(tweet.created_at).toLocaleString().split(",")
    const updated = await collectionRef.doc(tweet.user.id_str.toString()).set({
        date: dateTime[0],
        time: dateTime[1],
        tweet_id: tweet.id_str,
        name: tweet.user.name,
        handle: tweet.user.screen_name,
        profile_image: tweet.user.profile_image_url_https
    })
}
module.exports = addUser