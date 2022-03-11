// @desc Importing Library for Twitter
const TWIT = require('twit');
const wakeUpDyno = require("./Dyno_Ping.js");

// For server engagement
const express = require('express');

const app = express()

// @desc Importing dotenv to get API tokens from .env
const dotenv = require('dotenv')

// @desc Initializing package
dotenv.config()

// @desc Destructuring and extracting variables from ENV
const { CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = process.env

// @desc Dyno link Declaration Heroku
const Dyno_Link = "https://bot-151daysofcode.herokuapp.com/"


// @desc Authenticating OAuth
const Twit_config = new TWIT({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token: ACCESS_TOKEN,
    access_token_secret: ACCESS_TOKEN_SECRET
})

// @desc Webhook connection to monitor regular tweets
function StreamData() {
    console.log("<============= #151daysofcode Application Started =============>")
    var stream = Twit_config.stream('statuses/filter', { track: ['#151daysofcode'] })
    // Webhook connection
    stream.on('tweet', function (tweet) {
        // Detecting Tweet 
        console.log(`> New Tweet Detected : ${tweet.id_str}`)
        // Passing unique id to 
        Retweet(tweet.id_str, tweet)
    })
}

// @desc this function takes id as parameter and retweets it
function Retweet(ids) {
    setTimeout(() => {
        Twit_config.post('statuses/retweet/:id', { id: ids }, function (err, data, response) {
            if (err) {
                console.log(`> Already Tweeted : ${ids}`)
            }
            else {
                console.log(`> Posted : ${ids}`)
                // Liking Tweet
                Twit_config.post('favorites/create', { id: ids }, function (err, response) {
                    if (err) {
                        console.log("> Error: Tweet " + ids + " could not be liked. " + err);
                    }
                    else {
                        console.log("> Success: Tweet " + ids + " liked. ");
                    }
                });
            }
        })
    }, 1000 * 20)
}

// Function Call
StreamData()

const port = process.env.PORT || 3000 || 5500 || 4444 || 3333;
app.listen(port, () => {
    console.log(`Listening On port ${port}`);
    // wakeUpDyno(Dyno_Link);
})
