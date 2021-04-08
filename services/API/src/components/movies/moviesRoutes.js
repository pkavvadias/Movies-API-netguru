'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./moviesController');
const authentication = require('../../middlewares/isAuthenticated');
const credits =require('../../middlewares/hasCredits');

router
    .get('/',authentication.authCheck,credits.hasCredits,controller.getMovies);

module.exports = router;