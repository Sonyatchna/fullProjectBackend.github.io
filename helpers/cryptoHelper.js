const crypto = require('crypto');
const { secret } = require('../options/server');

const sha512 = password => {
    return crypto.createHmac('sha512', secret).update(password).digest('hex');
};

module.exports = userPassword => {
    return sha512(userPassword);
};