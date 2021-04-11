'use strict'

const sinon = require("sinon");
const db = require('../config/db-config').db;

describe('Database test',function(){
    it('Should get number of movies added by a user durring curent calendar month',async function(){
        const contextObj = {user:{userId:123}};
        
        const numStub = sinon.stub(db,'one')
        await db.movies.checkNumber(contextObj);
        sinon.assert.calledWith(numStub, 'SELECT COUNT(*) FROM movies WHERE userid = $1 AND date_part($2,date_added) = date_part($2,NOW()) AND date_part($3,date_added) = date_part($3,NOW())', [contextObj.user.userId, 'month', 'year']);
        numStub.restore();
        sinon.restore();
    });

    it('Should add new movie',async function(){
        const contextObj = {
        user: {userId:123},
        movie: {
            title: 'Test',
            released: '1900-01-01',
            genre: 'test',
            director: 'test'
        }
    };
        
        const addStub = sinon.stub(db,'none');
        await db.movies.addMovie(contextObj);
        sinon.assert.calledWith(addStub,'INSERT INTO movies(userid,date_added,title,released,genre,director) VALUES($1,NOW(),$2,$3,$4,$5)',[contextObj.user.userId,contextObj.movie.title,contextObj.movie.released,contextObj.movie.genre,contextObj.movie.director]);
        addStub.restore();
        sinon.restore();
    });

    it('Should get movies',async function(){
        const contextObj = {user:{userId:123}};
        
        const getStub = sinon.stub(db,'manyOrNone');
        await db.movies.getMovies(contextObj);
        sinon.assert.calledWith(getStub,'SELECT * FROM movies WHERE userid = $1', [contextObj.user.userId]);
        getStub.restore();
        sinon.restore();
    });
});
