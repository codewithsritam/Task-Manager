const User = require('../../model/user.model');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
    });
    await user.save();

    res.status(200).json({
        message: 'User added successfully',
        user: user,
    });
}

module.exports = addUser;