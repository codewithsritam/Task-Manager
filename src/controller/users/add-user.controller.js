const User = require('../../model/user.model');
const asyncHandler = require('../../utils/asyncHandler');
const sendApiResponse = require('../../utils/responseUtils');
const genrateToken = require('../../middleware/make-token');
const bcrypt = require('bcrypt');

const addUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return sendApiResponse(res, 404, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
    });
    await user.save();

    const token = genrateToken(user._id);

    res.status(200).json({
        message: 'User added successfully',
        user: user,
        token: token,
    });
});

module.exports = addUser;