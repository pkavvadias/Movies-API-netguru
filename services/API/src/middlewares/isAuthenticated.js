'use strict'

const jwt = require('jsonwebtoken')
const env = require('../utils/environment');

const authCheck = (req, res, next) => {
    const header = req.headers;
    if (header.authorization) {
        const token = header.authorization.split(" ")[1];
        jwt.verify(token, env.JWT_SECRET, { issuer: "https://www.netguru.com/"}, function (err, decoded) {
            if (err) {
                return res.status(401)
                    .json({
                        status: 'failure',
                        message: 'Invalid token'
                    });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(401)
            .json({
                status: 'failure',
                error: 'No token found'
            });
    }
}

module.exports = {
    authCheck: authCheck
};