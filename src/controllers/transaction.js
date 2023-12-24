const User = require('../models/User');
const Notification = require('../models/Notification');

class Views {
    //hiển thị view cho người dùng
    async getHome(req, res, next) {
        try {
            const data = {
                userName: null,
                money: null,
                accountnumber: null,
            }
            const view = await User.findOne({ _id: req.user.userId });
            data.userName = view.name;
            data.accountnumber = view.accountnumber;
            data.money = view.money;
            res.status(200).json({
                status: 'success',
                data: data,
            });
        } catch (error) {
            res.json(error);
        }
    }
    async transfer(req, res, next) {
        try {
            const data = {
                userName: null,
                money: null,
                accountnumber: null,
            }
            const view = await User.findOne({ _id: req.user.userId });
            data.userName = view.name;
            data.accountnumber = view.accountnumber;
            data.money = view.money;
            res.status(200).json({
                status: 'success',
                data: data,
            });
        } catch (error) {
            res.json(error);
        }
    }
    async withdraw(req, res, next) {
        try {
            const data = {
                userName: null,
                money: null,
                accountnumber: null,
            }
            const view = await User.findOne({ _id: req.user.userId });
            data.userName = view.name;
            data.accountnumber = view.accountnumber;
            data.money = view.money;
            res.status(200).json({
                status: 'success',
                data: data,
            });
        } catch (error) {
            res.json(error);
        }
    }
    async loaded(req, res, next) {
        try {
            const data = {
                userName: null,
                money: null,
                accountnumber: null,
            }
            const view = await User.findOne({ _id: req.user.userId });
            data.userName = view.name;
            data.accountnumber = view.accountnumber;
            data.money = view.money;
            res.status(200).json({
                status: 'success',
                data: data,
            });
        } catch (error) {
            res.json(error);
        }
    }
    //hiển thị các thông báo của người dùng
    async notification(req, res, next) {
        try {
            const notification = await Notification.find({ author: req.user.userId })
            res.status(200).json({
                status: 'success',
                results: notification.length,
                data: { notification },
            });
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    }

    //lấy trạng thái người dùng
    async getCurrentUesr(req, res, next) {
        try {
            const data = { user: null };
            if (req.user) {
                const user = await User.findOne({ _id: req.user.userId });
                data.user = { userName: user.name };
            };
            res.status(200).json({
                status: 'sucess',
                data: data,
            });
        } catch (error) {
            res.json(error);
        }
    }

}




module.exports = new Views;
