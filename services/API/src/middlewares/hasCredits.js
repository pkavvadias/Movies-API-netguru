'use strict'

const db = require('../config/db-config').db;

const hasCredits = async (req, res, next) => {
    if (req.user === 'premium') {
        next();
    }
    else {
        const entries = await db.movies.checkNumber(req.user.userId);
        entries.count < 5 ? next() : res.status(401).json({ error: 'Not enough credits' });
    }
}

module.exports = {
    hasCredits: hasCredits
}