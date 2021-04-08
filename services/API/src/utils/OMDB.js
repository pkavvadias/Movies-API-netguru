const axios = require('axios')

const url = 'http://www.omdbapi.com/?apikey=' + OMDB_KEY + '&t=';

const movieInfo = async (title) => {
    const info = await axios.get(url+'title');
    return info;
}