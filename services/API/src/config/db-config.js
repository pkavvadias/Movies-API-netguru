'use strict'
const promise = require('bluebird'); 
const pgPromise = require('pg-promise'); 
const MoviesDAL = require('../components/movies/moviesDAL');
const dbUrl = 'postgres://'+process.env.POSTGRES_USER+':'+process.env.POSTGRES_PASSWORD+'@localhost:'+process.env.POSTGRES_PORT+'/'+process.env.POSTGRES_DB;

const initOptions = {

    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,

    // Extending the database protocol
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj, dc) {
        // Database Context (dc) is mainly useful when extending multiple databases with different access API-s.

        // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
        // which should be as fast as possible.
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
