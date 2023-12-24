const mongoose = require('mongoose');


const notification = new mongoose.Schema({
    money: { type: String, default: null },
    code: { type: String, default: null },
    transaction: { type: String, default: null },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

}, { timestamps: true });

module.exports = mongoose.model('Notification', notification);