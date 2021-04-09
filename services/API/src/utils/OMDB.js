'use strict'

const axios = require('axios')
var env = require('../utils/environment');

const url = 'http://www.omdbapi.com/?apikey=' + env.OMDB_KEY + '&t=';
const movieInfo = async (title) => {
    const info = await axios.get(url + title);
    if (info.data.Response === 'True') {
        const movie = {
            Title: info.data.Title,
            Released: info.data.Released,
            Genre: info.data.Genre,
            Director: info.data.Director
        }
        return movie;
    }
    else return false;
}

module.exports = {
    movieInfo: movieInfo
}