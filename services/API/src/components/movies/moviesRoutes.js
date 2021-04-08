'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./moviesController');
const authentication = require('../../middlewares/isAuthenticated');
const credits = require('../../middlewares/hasCredits');

router
    .get('/', authentication.authCheck, controller.getMovies)
    .post('/', authentication.authCheck, credits.hasCredits, controller.addMovie)

module.exports = router;