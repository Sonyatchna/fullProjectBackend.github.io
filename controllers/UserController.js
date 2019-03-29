const authorizationRepository = new require("../repository/AuthRepository");
const { register, login, getListOfUsers, deleteUserById, getUserById, sendEmail,changePass } = authorizationRepository;
const { handleOk } = require("../helpers/dbHelper");

module.exports = {

  login(req, res) {
    handleOk(res,
      login(req.body))
  },

  register(req, res) {
    handleOk(res,
      register(req.body))
  },

  getListOfUsers(req, res) {
    handleOk(res,
      getListOfUsers(req.body))
  },

  deleteUserById(req, res) {
    handleOk(res,
      deleteUserById(req.params.id))
  },

  getUserById(req, res) {
    handleOk(res,
      getUserById(req.params.id))
  },

  sendEmail(req, res) {
    handleOk(res,
      sendEmail(req.body))
  },

  changePass(req, res){
    handleOk(res,
      changePass(req.body))
  }

};