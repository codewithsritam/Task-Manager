const JWT = require('jsonwebtoken');
require('dotenv').config();

const genrateToken = (id) => {
    return JWT.sign( { id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '30d'
    });
};

module.exports = genrateToken;