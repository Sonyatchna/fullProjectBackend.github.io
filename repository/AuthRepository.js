const checkUser = require('../services/loginService');
const User = require('../models/User');
const CustomError = require('../errors/CustomError');
const sha512 = require('../helpers/cryptoHelper');
const nodemailer = require('nodemailer');

module.exports = class AuthorizationRepository {

  static async login(userBody) {
    return await checkUser(userBody);
  }

  static async register(userBody) {
    const users = await User.find({login: userBody.login});
    if (users.length > 0) throw new CustomError('User already exists!');
    userBody.password = sha512(userBody.password);
    const user = new User(userBody);
    user.save();
    return {
      message: 'Successful registration!',
      user
    }
  }

  static async getListOfUsers() {
    return await User.find();
  }

  static async deleteUserById(id) {
    return await User.findByIdAndRemove(id);
  }

  static async getUserById(id) {
    return await User.findById(id);
  }

  static async sendEmail({login}) {
    const user = await User.findOne({login: login}).exec();
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'sofiyatatchyn@gmail.com',
        clientId: '636680913275-oo3e9rkcvppb1s7a26j0hijt4dfgun14.apps.googleusercontent.com',
        clientSecret: 'sKLvoJpVM5pqEXq4WYAEgI6w',
        refreshToken: '1/N_Upiws3Xb3U_Q_nlbCrKshcFrs_q916xrJAOZSVBbQ',
        access_token: 'ya29.GlvbBg__XYllZ9uIgFB9UF_FJhMBmNKw03zvx0Jef0PTganWujd9ahFEZrWohBwe0bUcfX2g-geCrhuYXhYqs96dp7RKOK7ecPlXMrTUslvi1gbErg5T-i2IeeHU'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    transporter.on('log', console.log);
    user.restorePasswordToken = sha512(user.firstName + user.lastName);
    await user.save();
    const url = `http://localhost:4200/change-password/${user.restorePasswordToken}`;
    console.log(user);
    let mailOptions = {
      from: 'sofiyatatchyn@gmail.com',
      to: user.email,
      subject: 'Nodemailer test',
      html: `<p>Please, follow the link to change your password!</p><br><a href=${url}>Click to change password</a>`
    };

    return new Promise((resolve, rejected) => {
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log('Error ' + err.message);
          rejected(new CustomError("Cant send email", "404"));
        } else {
          resolve({
            success: true,
            message: `A letter was successfully send to your email ${user.email}!`
          });
        }
      });
    })
  }

  static async changePass({password, token}){
    const user = await User.findOne({ restorePasswordToken: token }).exec();
    user.password = sha512(password);
    return await user.save();
  }

};