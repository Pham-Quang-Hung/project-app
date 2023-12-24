const User = require('../../models/User');
const Notification = require('../../models/Notification');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function Loade(socket) {
    socket.on("loade", async function (data) {
        //accuracy token
        const token = data.token.replace('bearer ', '');
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        //data access
        const user = await User.findOne({ _id: userId })
        //accuracy password

        //generate data create to notification
        if (bcrypt.compareSync(data.password, user.password)) {
            const value = {
                money: '',
                code: `${Math.floor(Math.random() * (900000) + 100000)}`,
                transaction: "mã nạp tiền",
            }
            // create notification code loade money
            await Notification.create({ ...value, author: userId })
            socket.emit('loade-sucessfully');
        } else {
            socket.emit('loade-failed');
        }


    })
}

module.exports = Loade;