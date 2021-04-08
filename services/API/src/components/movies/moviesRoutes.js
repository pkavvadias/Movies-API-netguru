'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./moviesController');
const authentication = require('../../middlewares/isAuthenticated');

router
    .get('/',authentication.authCheck,controller.getMovies);

module.exports = router;