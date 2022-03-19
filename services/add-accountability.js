const Twit_config = require("../config/twitter-config");
const addUser = require("../firebase/add-user");
const getUsername = require("../helpers/get_username");
const { SUBSCRIPTION_MESSAGE, REMINDERS } = require("../helpers/messages");
const sendDM = require("./send-dm");


async function addAccountability(tweet) {
    try {
        await addUser(tweet)
        await Twit_config.post('friendships/create', { user_id: tweet.user.id_str })
        const body = {
            "event": {
                "type": "message_create",
                "message_create": {
                    "target": {
                        "recipient_id": tweet.user.id_str
                    },
                    "message_data": {
                        "text": SUBSCRIPTION_MESSAGE.replace("<username>", getUsername(tweet))
                    }
                }
            }
        }
        setTimeout(() => {
            sendDM(body)
        }, 1000)
    } catch (e) {
        console.log(e.message)
    }
}
module.exports = addAccountability