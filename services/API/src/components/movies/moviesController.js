'use strict'
const db = require('../config/db-config').db;

const getMovies = (req, res, next) => {
    const contextObj = {
        user: req.user,
    };
    try {
        const result = await db.movies.getMovies(contextObj);
        return res.status(200)
            .json({
                status: 'success',
                data: result,
            });
    } catch (error) {
        return res.status(400)
            .json({
                status: 'failure',
                data: "Error occured, please try again"
            });
    }

}
const addMovie = () => {

}
module.exports = {
    getMovies: getMovies,
    addMovie: addMovie
}