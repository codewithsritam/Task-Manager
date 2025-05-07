const User = require('../../model/user.model');
const asyncHandler = require('../../utils/asyncHandler');
const sendApiResponse = require('../../utils/responseUtils');
const genrateToken = require('../../middleware/make-token');
const bcrypt = require('bcrypt');

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
   const user = await User.findOne({ email: email });
    if (!user) {
        return sendApiResponse(res, 404, 'User not found', null);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return sendApiResponse(res, 401, 'Invalid credentials', null);
    }
    const token = genrateToken(user._id);
    return sendApiResponse(res, 200, 'Login successful', { user: user, token: token });
});

module.exports = loginUser;