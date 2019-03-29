const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
  firstName: String,
  lastName: String,
  login: {type: String, unique: true},
  email: String,
  password: { type: String, required: true },
  restorePasswordToken: String
});

module.exports = mongoose.model('user', UserSchema);