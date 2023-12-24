const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, trim: true, required: [true, 'Name must be required'] },
    password: { type: String, trim: true, required: [true, 'Password must be required'], minlength: [6, 'Passqord must be at least 6 characters'] },
    name: { type: String, trim: true, required: [true, 'Name must be required'] },
    money: { type: Number, default: 0 },
    accountnumber: { type: String, unique: true, trim: true, require: [true, 'Accountnumber must be required'], minlength: [10, 'Accountnumber must be at least 10 characters'] },
}, { timestamps: true });


userSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (error, hash) {
        if (error) {
            return next(error);
        } else {
            user.password = hash;
            next();
        }
    })
})


module.exports = mongoose.model('User', userSchema);


