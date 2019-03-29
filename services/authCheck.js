const jwt = require('jsonwebtoken');
const config = require('../options/server');
const CustomError = require('../errors/CustomError');

module.exports = token => {
    console.log(token);
    return jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            throw new CustomError('Token is not valid');
        }
        return {
            success : true,
            decoded
        };
    });
};