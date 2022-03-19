const fs = require('fs')
const log = fs.createWriteStream('./logs/info.log', { flags: 'a' });
module.exports = log