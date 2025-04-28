const sendApiResponse = require('./responseUtils');

const asyncHandler = (fn) => async(req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.log(error);
        sendApiResponse(res, 500, 'Internal Server Error', null, error.message);
    }
}

module.exports = asyncHandler;