
const getUsers = require('../firebase/get-user');
const isDateWithin24Hours = require('../helpers/check24-hours');
const getRecentTweet = require('../helpers/get-recent-tweet');
const { REMINDERS } = require('../helpers/messages');
const sendDM = require('./send-dm');

async function cronJob() {
    const users = await getUsers()
    console.log(users)
    users.map(async (user) => {
        try {
            const tweets = await getRecentTweet(user.handle)
            const lastTweet = tweets.find(tweet => tweet.text.includes("#151daysofcode"))
            const body = {
                "event": {
                    "type": "message_create",
                    "message_create": {
                        "target": {
                            "recipient_id": user.id
                        },
                        "message_data": {
                            "text": lastTweet ? REMINDERS[0].message : REMINDERS[1].message
                        }
                    }
                }
            }
            if (!lastTweet) {
                return sendDM(body)
            }
            if (!isDateWithin24Hours(lastTweet.created_at)) {
                return sendDM(body)
            }
        } catch (e) {
            console.log(e)
        }

    })
}

module.exports = cronJob