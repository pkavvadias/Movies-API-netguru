'use strict'

const request = require('supertest');
const expect = require("chai").expect;
const sinon = require('sinon');
const data = require('../components/movies/moviesDAL');
const mocks = require('./mocks');
const app = require('../app');
const api = request(app);

describe('E2E tests',function(){
    it('POST /movies for basic user', async function(){
        const stub = sinon.stub(data.prototype, 'checkNumber').resolves({count:2});  // Simulate a basic user with 2 movies in database
        const response = await api.post('/movies').set('Authorization',mocks.token_basic).send('title=Harry Potter');
        stub.restore();
        expect(response.status).to.eql(200);
    });

    it('POST /movies for basic user having no credits left ', async function(){
        const stub = sinon.stub(data.prototype, 'checkNumber').returns({count:5}); // Simulate a basic user with 5 movies in database
        const response = await api.post('/movies').set('Authorization',mocks.token_basic).send('title=Harry Potter');
        stub.restore();
        expect(response.status).to.eql(401);
    });

    it('POST /movies for premium user ', async function(){
        const response = await api.post('/movies').set('Authorization',mocks.token_premium).send('title=Harry Potter');
        expect(response.status).to.eql(200);
    });

    it('GET /movies', async function(){
        const response = await api.get('/movies').set('Authorization',mocks.token_premium);
        expect(response.status).to.eql(200);
    });

    it('POST /movies with fake token', async function(){
        const response = await api.post('/movies').set('Authorization','test').send('title=Harry Potter');
        expect(response.status).to.eql(401);
    });

    it('POST /movies without token', async function(){
        const response = await api.post('/movies').send('title=Harry Potter');
        expect(response.status).to.eql(401);
    });

    it('GET /movies with wrong token', async function(){
        const response = await api.get('/movies').set('Authorization','test');
        expect(response.status).to.eql(401);
    });

    it('GET /movies without token', async function(){
        const response = await api.get('/movies');
        expect(response.status).to.eql(401);
    });
});