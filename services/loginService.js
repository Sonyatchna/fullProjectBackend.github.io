const User = require('../models/User');
const sha512 = require('../helpers/cryptoHelper');
const generateToken = require('../helpers/generateToken');
const CustomError = require('../errors/CustomError');

async function checkUser(userBody) {
  const user = await User.find({login: userBody.login}).exec();
  const hashPass = sha512(userBody.password);
  if (user.length === 1) {
    if (hashPass === user[0].password) {
      let token = generateToken(userBody.login);
      return {
        success: true,
        message: 'Successful authorization',
        token
      }
    } else {
      throw new CustomError('Incorrect password!');
    }
  } else {
    throw new CustomError('Incorrect login!');
  }
}

module.exports = checkUser;