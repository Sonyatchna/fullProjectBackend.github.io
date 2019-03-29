const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { login, register, getListOfUsers, deleteUserById, getUserById, sendEmail, changePass } = require('./controllers/UserController');
const { localDB, port } = require('./options/server');

mongoose
  .connect(localDB, {useNewUrlParser: true})
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "*");
  res.header(
    "Access-Control-Allow-Credentials",
    true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Access-Control-Allow-Headers, Authorization",
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.header(
    "Access-Control-Expose-Headers",
    "Content-Type, Content-Disposition"
  );
  next();
});

app.post('/login', (req, res) => login(req, res));
app.post('/register', (req, res) => register(req, res));
app.get('/users', (req, res) => getListOfUsers(req, res));
app.get('/users/:id', (req, res) => getUserById(req, res));
app.delete('/delete-user/:id', (req, res) => deleteUserById(req, res));
app.post('/restore-password', (req, res) => sendEmail(req, res));
app.post('/change-password', (req, res) => changePass(req, res));

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log('Listening...');
});