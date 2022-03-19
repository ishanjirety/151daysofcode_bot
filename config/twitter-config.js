// @desc Importing Library for Twitter
const TWIT = require('twit');
require('dotenv').config();
const { CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = process.env

console.log(CONSUMER_KEY)
// @desc Authenticating OAuth
const Twit_config = new TWIT({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token: ACCESS_TOKEN,
    access_token_secret: ACCESS_TOKEN_SECRET
})
module.exports = Twit_config