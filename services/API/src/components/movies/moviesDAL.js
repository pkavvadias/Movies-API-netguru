'use strict';

class MoviesDAL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    async checkNumber(userid){
        return await this.db.one('SELECT COUNT(*) FROM movies WHERE userid=$1 AND date_part($2,date_added) = date_part($2,NOW()) AND date_part($3,date_added) = date_part($3,NOW())' ,[userid,'month','year'])
    }
}
module.exports = MoviesDAL;