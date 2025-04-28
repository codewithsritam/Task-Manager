const User = require('../../model/user.model');
const asyncHandler = require('../../utils/asyncHandler');
const sendApiResponse = require('../../utils/responseUtils');
const bcrypt = require('bcrypt');

const editUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
        return sendApiResponse(res, 404, 'User not found');
    }

    if (name) user.name = name;
    if (email) user.email = email;

    // Check if the password is provided and hash it
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    await user.save();

    return sendApiResponse(res, 200, 'User updated successfully', {
        id: user._id,
        name: user.name,
        email: user.email
    });
});

module.exports = editUser;