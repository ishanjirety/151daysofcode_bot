const { log } = require("../helpers/log");
const fs = require('fs');
const Twit_config = require("../config/twitter-config");
/**
 * @param {Twitter_ID} id 
 */
function Retweet(id) {
    setTimeout(() => {
        Twit_config.post('statuses/retweet/:id', { id: id }, function (err, data, response) {
            if (err) {
                const date = new Date().toLocaleDateString()
                log.write(`[${date}] ${e.message}`)
            }
            else {
                console.log(`> Posted : ${id}`)
                // Liking Tweet
                Twit_config.post('favorites/create', { id: id }, function (err, response) {
                    if (err) {
                        const date = new Date().toLocaleDateString()
                        log.write(`[${date}] Error: Tweet "+ ${id} +" could not be liked. ${e.message}`)
                    }
                    else {
                        console.log("> Success: Tweet " + id + " liked. ");
                    }
                });
            }
        })
    }, 1000 * 20)
}

module.exports = Retweet
