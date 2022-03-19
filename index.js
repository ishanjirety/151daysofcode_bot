// For server engagement
const express = require('express');
var cron = require('node-cron');
const cronJob = require('./services/cron.js');
const app = express()
const StreamData = require('./services/stream/tweet-151daysofcode.js');


const port = process.env.PORT || 3000 || 5500 || 4444 || 3333;
// cronJob()

app.listen(port, () => {
    console.log(`Listening On port ${port}`);
    console.log("<============= #151daysofcode Application Started =============>")
    StreamData()
    cron.schedule("0 21 * * *", cronJob)
})
