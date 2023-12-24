const express = require('express');

const Router = express.Router();

const { register, login } = require('../controllers/authcontroller');
const { getCurrentUesr } = require('../controllers/transaction');
const checkCurrenToken = require('../middlewares/checkCurrenToke');


Router.route('/register').post(register);
Router.route('/login').post(login);
Router.route('/check').get(checkCurrenToken, getCurrentUesr);


module.exports = Router;
