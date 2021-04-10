const express = require('express');
const movies = require('./components/movies/moviesRoutes');

app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/movies', movies);

module.exports = app;
