const User = require('../../models/User');
const Notification = require('../../models/Notification');
const jwt = require('jsonwebtoken');



function chat(socket) {
    //console.log('connectin sucessfully transfer ')
    socket.on("transfer", async function (data) {
        data.amount = parseFloat(data.amount);
        const token = data.token.replace('bearer ', '');
        //dữ liệu để create notification
        const value = {
            money: '',
            code: "",
            transaction: "chuyển tiền thành công",
        }
        try {
            //confirm token
            const { userId } = jwt.verify(token, process.env.APP_SECRET);
            const user = await User.findOne({ _id: userId });
            if (user) {
                const recipient = await User.findOne({ accountnumber: data.bankAccount });
                //xác nhận số tài khoản của người nhận
                //xác nhận tên của người nhận
                if(recipient){   
                        if (recipient.name === data.recipient) {
                            //xác nhận số tiền của người nhận có đủ để chuyển không
                            if (user.money >= data.amount) {
                                try {
                                    //thực hiện update người gửi                                                      
                                    await User.updateOne({ _id: userId }, { $set: { money: user.money - data.amount } });
                                    value.money = `tài khoản của bạn bị trừ ${-data.amount} số tiền còn lại trong tài khoản ${user.money - data.amount}`;
                                    await Notification.create({ ...value, author: userId });
                                    //nhận diện là chuyển cho bản thân hay chuyển cho người khác
                                    if (recipient.accountnumber == user.accountnumber) {
                                        try {
                                            //thực hiện update dữ liệu cho người nhận(chính mình)
                                            await User.updateOne({ _id: recipient._id }, { $set: { money: recipient.money } });
                                            value.money = `tài khoản của bạn được nhận ${+ data.amount} số tiền còn lại trong tài khoản ${recipient.money}`;
                                        } catch (error) {
    
                                        }
                                    } else {
                                        try {
                                            //thực hiện update dữ liệu cho người nhận
                                            await User.updateOne({ _id: recipient._id }, { $set: { money: recipient.money + data.amount } });
                                            value.money = `tài khoản của bạn được nhận ${+ data.amount} số tiền còn lại trong tài khoản ${recipient.money + data.amount}`;
                                        } catch (error) {
    
                                        }
                                    }
                                    //tạo thông báo cho người nhận 
                                    value.transaction = `bạn đã nhận tiền từ ${user.name}`
                                    await Notification.create({ ...value, author: recipient._id });
    
                                    socket.emit("serversend-sucessfully")
                                } catch (error) {
    
                                }
                            } else {
                                socket.emit("accountnumber-failed", 'money-failed')
                            }
                        } else {
                            socket.emit("accountnumber-failed", "name-failed")
                        }
                } else {
                    socket.emit("accountnumber-failed", "accountnumber-failed")
                }
            }
        } catch (error) {
            // Handle the case where token verification fails
            console.log(error)
        };

    });
}

module.exports = chat;