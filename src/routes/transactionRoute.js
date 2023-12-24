const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { getHome, transfer, withdraw, loaded, notification } = require('../controllers/transaction');
const checkCurrenToken = require('../middlewares/checkCurrenToke');
const Router = express.Router();

Router.route('/gethome').get(checkCurrenToken, getHome);
Router.route('/transfer').get(verifyToken, transfer);
Router.route('/withdraw').get(verifyToken, withdraw);
Router.route('/loaded').get(verifyToken, loaded);
Router.route('/notification').get(verifyToken, notification);


module.exports = Router;
