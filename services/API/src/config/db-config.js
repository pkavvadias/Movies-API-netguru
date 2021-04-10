'use strict'

const promise = require('bluebird');
const pgPromise = require('pg-promise');
const MoviesDAL = require('../components/movies/moviesDAL');
var env = require('../utils/environment');
const dbUrl = 'postgres://' + env.POSTGRES_USER + ':' + env.POSTGRES_PASSWORD + '@localhost:' + env.POSTGRES_PORT + '/' + env.POSTGRES_DB;

const initOptions = {

    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,
    // Required in order to mock database during testing
    noLocking : true, 
    // Extending the database protocol
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj, dc) {
        obj.movies = new MoviesDAL(obj, pgp);
    }
};


// Initializing the library:
const pgp = pgPromise(initOptions);

// Creating the database instance:
const db = pgp(dbUrl);

module.exports = {
    pgp: pgp,
    db: db
};
