'use strict'

const db = require('../../config/db-config').db;
const OMDB = require('../../utils/OMDB');

const getMovies = async (req, res, next) => {
    const contextObj = {
        user: req.user,
    };
    try {
        const result = await db.movies.getMovies(contextObj);
        return res.status(200)
            .json({
                status: 'success',
                data: result
            });
    } catch (error) {
        return res.status(400)
            .json({
                status: 'failure',
                data: "Error occured, please try again"
            });
    }

}
const addMovie = async (req, res, next) => {

    const movie = await OMDB.movieInfo(req.body.title);
    if (movie === false) {
        return res.status(400)
            .json({
                status: 'failure',
                data: "Movie not found"
            });
    }

    const contextObj = {
        user: req.user,
        movie: movie
    };
    try {
        await db.movies.addMovie(contextObj);
        return res.status(200)
            .json({
                status: 'success',
                data: contextObj.movie,
            });
    } catch (error) {
        return res.status(400)
            .json({
                status: 'failure',
                data: "Error occured. Please check you typed movie name correctly and try again"
            });
    }
}

module.exports = {
    getMovies: getMovies,
    addMovie: addMovie
}