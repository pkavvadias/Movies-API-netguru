'use strict';

class MoviesDAL {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    async checkNumber(contextObj) {
        return await this.db.one('SELECT COUNT(*) FROM movies WHERE userid = $1 AND date_part($2,date_added) = date_part($2,NOW()) AND date_part($3,date_added) = date_part($3,NOW())', [contextObj.user.userId, 'month', 'year'])
    }

    async getMovies(contextObj) {
        return await this.db.manyOrNone('SELECT * FROM movies WHERE userid = $1', [contextObj.user.userId]);
    }

    async addMovie(contextObj) {
        const insertMovieQueryText = 'INSERT INTO movies(userid,date_added,title,released,genre,director) VALUES($1,NOW(),$2,$3,$4,$5)';
        const inserMovieQueryValues = [contextObj.user.userId,contextObj.movie.title,contextObj.movie.released,contextObj.movie.genre,contextObj.movie.director];
        return await this.db.none(insertMovieQueryText,inserMovieQueryValues);
    }
}
module.exports = MoviesDAL;