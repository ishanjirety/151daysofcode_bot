const axios = require('axios')
const OAuth = require('oauth-1.0a')
const crypto = require('crypto')



function generateTwitterHeadersPOST(url, body) {
    const oauth = OAuth({
        consumer: { key: process.env.CONSUMER_KEY, secret: process.env.CONSUMER_SECRET },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
            return crypto
                .createHmac('sha1', key)
                .update(base_string)
                .digest('base64')
        },
    })

    const authorization = oauth.authorize({
        url: url,
        method: 'POST',
        body: body
    }, {
        key: process.env.ACCESS_TOKEN,
        secret: process.env.ACCESS_TOKEN_SECRET,
    });

    return { headers: oauth.toHeader(authorization) }
}



module.exports = { generateTwitterHeadersPOST }

// axios.post(
//     config.url,
//     request_data.data,
//     { headers: oauth.toHeader(authorization) }).then(x => console.log(x));