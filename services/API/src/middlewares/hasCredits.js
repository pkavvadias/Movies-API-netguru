'use strict'

const db = require('../config/db-config').db;

const hasCredits = async (req, res, next) => {
    const contextObj = {
        user: req.user,
    };
    if (contextObj.user.role === 'premium') {
        next();
    }
    else {
        const entries = await db.movies.checkNumber(contextObj);
        entries.count < 5 ? next() : res.status(401).json({ status: 'failure', message: 'Not enough credits' });
    }
}

module.exports = {
    hasCredits: hasCredits
}