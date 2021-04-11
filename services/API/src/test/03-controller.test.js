
'use strict'

const sinon = require("sinon");
const data = require('../components/movies/moviesDAL');
const mocks = require('./mocks');
const controller = require('../components/movies/moviesController');
const getStub = sinon.stub(data.prototype,'getMovies');
const addStub = sinon.stub(data.prototype,'addMovie');
const next = sinon.stub();
const OMDB = require('../utils/OMDB');
const OMDBstub = sinon.stub(OMDB,'movieInfo');

describe('Controller tests',async function(){
    it('Returns success message when getting movies', async function(){
        await controller.getMovies(mocks.reqBasic,mocks.res,next);
        sinon.assert.calledWith(mocks.res.status, 200);
    });

    it('Returns error message when there is error getting movies', async function(){
        getStub.throws('Error');
        await controller.getMovies(mocks.reqBasic,mocks.res,next);
        sinon.assert.calledWith(mocks.res.status, 401);
    });

    it('Returns success message when successfully adding movies', async function(){
        await controller.addMovie(mocks.reqBasic,mocks.res,next);
        sinon.assert.calledWith(mocks.res.status, 200);
    });

    it('Returns error message when movie not found', async function(){
        OMDBstub.resolves(false);
        await controller.addMovie(mocks.reqBasic,mocks.res,next);
        sinon.assert.calledWith(mocks.res.status, 400);
    });

    it('Returns error message when adding movie fails', async function(){
        addStub.throws('Error');
        await controller.addMovie(mocks.reqBasic,mocks.res,next);
        sinon.assert.calledWith(mocks.res.status, 400);
    });
});
