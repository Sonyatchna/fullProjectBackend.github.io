const jwt = require('jsonwebtoken');
const { secret } = require('../options/server');

module.exports = login => {
    return jwt.sign(
        { username: login },
        secret,
        { expiresIn: '24h' }
    );
};