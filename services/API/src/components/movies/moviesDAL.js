'use strict';

class MoviesDAL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }
}
module.exports = MoviesDAL;