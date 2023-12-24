
const authRoute = require('../routes/authRoute');
const transaction = require('../routes/transactionRoute');

function connect(app) {
    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/views', transaction);
}

module.exports = connect;
