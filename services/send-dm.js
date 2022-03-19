const { generateTwitterHeadersPOST } = require("../helpers/generate_twitter_headers");
const { SEND_DM } = require("./api/send_dm_api");
const axios = require('axios')


async function sendDM(body) {
    try {
        const { data } = await axios.post(
            SEND_DM,
            body,
            generateTwitterHeadersPOST(SEND_DM, body));
        return Promise.resolve(data)
    } catch (e) {
        return Promise.reject(e.message)
    }
}
module.exports = sendDM
