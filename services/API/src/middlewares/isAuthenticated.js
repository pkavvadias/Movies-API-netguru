'use strict'

const jwt = require('jsonwebtoken')
var env = require('../utils/environment');

function authCheck(req,res,next){
    var token = req.headers.authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, env.JWT_SECRET,{issuer:"https://www.netguru.com/",subject:"123"}, function(err, decoded) {
            if (err) {
                console.log(err)
                return res.status(401).json({ status: 'fail', error: 'Invalid token' });
            } else {
                req.user = decoded;
                console.log(req.user);
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