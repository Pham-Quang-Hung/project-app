const User = require('../../models/User');
const Notification = require('../../models/Notification');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function Withdraw(socket) {
    socket.on('withdraw', async function (data) {
        //accuracy token
        const token = data.token.replace('bearer ', '');
        const { userId } = jwt.verify(token, process.env.APP_SECRET)
        //data access
        const user = await User.findOne({ _id: userId });
        data.amount = parseFloat(data.amount);
        //accuracy password
        if (bcrypt.compareSync(data.password, user.password)) {
            if (data.amount <= user.money) {
                //generate data to create notification
                const value = {
                    money: '',
                    code: `${Math.floor(Math.random() * (900000) + 100000)}`,
                    transaction: "mã rút tiền",
                }
                try {
                    //update user
                    await User.updateOne({ _id: userId }, { set: { money: user.money - data.amount } });
                    //create code withdraw money
                    await Notification.create({ ...value, author: userId });
                } catch (error) {

                }
                socket.emit('withdraw-sucessfully')
            } else {
                socket.emit('withdraw-failed', 'failed money...')
            }
        } else {
            socket.emit('withdraw-failed', 'failed password...')
        }

    })
}

module.exports = Withdraw;
