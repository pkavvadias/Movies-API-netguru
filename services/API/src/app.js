const express = require('express');
const movies = require('./components/movies/moviesRoutes');

const app = express();
app.use('/api/movies', movies);


module.exports = app;
