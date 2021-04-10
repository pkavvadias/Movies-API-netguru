'use strict'

const expect = require("chai").expect;
const sinon = require('sinon');
const mocks = require('./mocks')
const hasCredits = require('../middlewares/hasCredits').hasCredits;
const database = require('../components/movies/moviesDAL');
const stub = sinon.stub(database.prototype, 'checkNumber');
const chai = require("chai");

describe('Credit check', function () {    
    it('Should allow basic user with less than 5 movies to add movie',async function () {
        stub.returns({count: 4})
        const nextSpy = sinon.spy();
        
        await hasCredits(mocks.reqBasic, mocks.res, nextSpy);
        expect(nextSpy.called).to.be.true;
    });
    
        it('Should block basic user with 5 movies to add movie', async function () {
        stub.returns({count: 5})
        const nextSpy = sinon.spy();

        await hasCredits(mocks.reqBasic, mocks.res, nextSpy);
        expect(nextSpy.called).to.be.false;
    });

    it('Should block basic user with more than 5 movies to add movie', async function () {        
        stub.returns({count: 6})
        const nextSpy = sinon.spy();

        await hasCredits(mocks.reqBasic, mocks.res, nextSpy);
        expect(nextSpy.called).to.be.false;
    });

    it('Should allow premium user with more than 5 movies to add movie', async function () {
        stub.returns({count: 6})
        const nextSpy = sinon.spy();

        await hasCredits(mocks.reqPremium, mocks.res, nextSpy);
        expect(nextSpy.called).to.be.true;
    });
})