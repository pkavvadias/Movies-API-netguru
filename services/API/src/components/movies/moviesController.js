'use strict'

const db = require('../../config/db-config').db;
const OMDB = require('../../utils/OMDB');

const getMovies = async (req, res, next) => {
    const contextObj = {
        user: req.user,
    };
    console.log(req.user.userId)
    console.log(contextObj.user.userId)
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
const addMovie = async (req,res,next) => {    
    try {
    const contextObj = {
        user: req.user,
        movie: await OMDB.movieInfo(req.body.title)
    };
        const result = await db.movies.addMovie(contextObj);
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
module.exports = {
    getMovies: getMovies,
    addMovie: addMovie
}