const express = require('express');
const movies = require('./components/movies/moviesRoutes');

app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use('/api/movies', movies);

module.exports = app;
