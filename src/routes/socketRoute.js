const transfer = require('../configs/socketio/transfer')
const loaded = require('../configs/socketio/loaded')
const withdraw = require('../configs/socketio/withdraw')

function connect(io) {
    io.on('connection', transfer);
    io.on('connection', loaded);
    io.on('connection', withdraw)
}

module.exports = { connect };

