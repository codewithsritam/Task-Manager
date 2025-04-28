const JWT = require('jsonwebtoken');
const sendApiResponse = require('../utils/responseUtils');
const asyncHandler = require('../utils/asyncHandler');

const verifyToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendApiResponse(res, 401, 'Token not provided');
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        return sendApiResponse(res, 401, 'Invalid token');
    }
});

module.exports = verifyToken;