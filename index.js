// @desc Importing Library for Twitter
const TWIT = require('twit');

// For server engagement
const express=require('express');

const app=express()

// @desc Importing dotenv to get API tokens from .env
const dotenv = require('dotenv')

// @desc Initializing package
dotenv.config()

// @desc Destructuring and extracting variables from ENV
const {CONSUMER_KEY,CONSUMER_SECRET,ACCESS_TOKEN,ACCESS_TOKEN_SECRET} = process.env


// @desc Authenticating OAuth
const Twit_config =new TWIT ({
    
    consumer_key : CONSUMER_KEY,
    consumer_secret : CONSUMER_SECRET,
    access_token : ACCESS_TOKEN,
    access_token_secret : ACCESS_TOKEN_SECRET
})

// @desc Webhook connection to monitor regular tweets
function StreamData(){
    console.log("<============= #151daysofcode Application Started =============>")
    var stream = Twit_config.stream('statuses/filter', { track: ['#151daysofcode'] })
    // Webhook connection
    stream.on('tweet', function (tweet) {
        // Detecting Tweet 
        console.log(`> New Tweet Detected : ${tweet.id_str}`)
        // Passing unique id to retweet
       Retweet(tweet.id_str,tweet)
      })
}

// @desc this function takes id as parameter and retweets it
function Retweet(ids,tweet){
        console.log(tweet.user.id)
        setTimeout(()=>{
            Twit_config.post('statuses/retweet/:id', { id: ids }, function (err, data, response) {
                if(err){
                    console.log(`> Already Tweeted : ${ids}`)
                }
                else{
                    console.log(`> Posted : ${ids}`)
                    // Liking Tweet
                    Twit_config.post('favorites/create', {id: ids}, function(err, response){
                        if (err) {
                           console.log("> Error: Tweet " + ids + " could not be liked. " + err);
                        }
                        else{
                            console.log("> Success: Tweet " + ids + " liked. ");
                        }
                    });
                }
              })
        },1000*20)
    }


// <================== To get accumulated tweets for future ====================>

// @desc Initialising tweet parameters
const PARAMETERS = {
    q:"#151daysofcode",
    count:100
}

// @desc making a GET request to twitter to get tweets
// @desc 'search/tweets' end points

// SearchTweet()
const SearchTweet_Interval = setInterval(SearchTweet,600000)
function SearchTweet(){
Twit_config.get('search/tweets',PARAMETERS,gotData)
}


// @desc To handle errors, Data & Responses 
function gotData(err,data,response){
    if(err){
        console.log(err)
        return
    }
    
    // @desc Extracting tweets from response
    const Recordedtweets = data.statuses
    // @desc creating empty array to store tweet IDs for retweet
    let TweetIDs = []
    console.log(data.statuses)
    // @desc Mapping through Recorded Tweets
    Recordedtweets.map((tweets,key)=>{
        TweetIDs.push(tweets.id_str)
    })
    Retweet(TweetIDs)
}

// <================== End Of Feature ====================>


// Function Call
StreamData()

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`Listening On port ${port}`);
})
