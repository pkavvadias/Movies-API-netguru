'use strict'

const axios = require('axios');
var env = require('../utils/environment');

const url = 'http://www.omdbapi.com/?apikey=' + env.OMDB_KEY + '&t=';
const movieInfo = async (title) => {
    const info = await axios.get(url + title);
    if (info.data.Response === 'True') {
        const movie = {
            title: info.data.Title,
            released: info.data.Released,
            genre: info.data.Genre,
            director: info.data.Director
        }
        return movie;
    }
    else return false;
}

module.exports = {
    movieInfo: movieInfo
}