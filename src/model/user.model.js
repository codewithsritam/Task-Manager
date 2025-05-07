const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    avatar: String,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// pre save avatar
userSchema.pre('save',  async function (next) {
    const url = `https://ui-avatars.com/api/`
    const name = this.name.split(' ').join('+');
    this.avatar = `${url}?name=${name}&background=random&color=fff&size=256`;
    next();
});

module.exports = mongoose.model('User', userSchema);