'use strict'

const jwt = require('jsonwebtoken')
const env = require('../utils/environment');

const authCheck = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, env.JWT_SECRET, { issuer: "https://www.netguru.com/", subject: "123" }, function (err, decoded) {
            if (err) {
                console.log(err.name)
                return res.status(401).json({ status: 'fail', error: 'Invalid token' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({ status: 'fail', error: 'No token found' });
    }
}

module.exports = {
    authCheck: authCheck
};