// @desc Importing Library for Twitter
const TWIT = require('twit');

// @desc Importing dotenv to get API tokens from .env
const dotenv = require('dotenv')

// @desc Initializing package
dotenv.config()

// @desc Deconstructing and extracting variables
const {CONSUMER_KEY,CONSUMER_SECRET,ACCESS_TOKEN,ACCESS_TOKEN_SECRET} = process.env


// @desc Authenticating OAuth
const Twit_config =new TWIT ({
    
    consumer_key : CONSUMER_KEY,
    consumer_secret : CONSUMER_SECRET,
    access_token : ACCESS_TOKEN,
    access_token_secret : ACCESS_TOKEN_SECRET
})

// @desc Initialising tweet parameters
const PARAMETERS = {
    q:"#151daysofcode",
    count:1
}
// @desc making a GET request to twitter to get tweets
// @desc 'search/tweets' end points
Twit_config.get('search/tweets',PARAMETERS,gotData)

// @desc To handle errors, Data & Responses 
function gotData(err,data,response){
    if(err){
        console.log(err)
        return
    }
    
    console.log(data)
    // @desc Extracting tweets from response
    const Recordedtweets = data.statuses
    // @desc creating empty array to store tweet IDs for retweet
    let TweetIDs = []
    
    // @desc Mapping through Recorded Tweets
    Recordedtweets.map((tweets)=>{
        TweetIDs.push(tweets.id)
        console.log(tweets.id)
    })
}


