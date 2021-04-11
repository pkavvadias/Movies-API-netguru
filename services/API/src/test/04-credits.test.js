'use strict'

const expect = require("chai").expect;
const sinon = require('sinon');
const mocks = require('./mocks')
const hasCredits = require('../middlewares/hasCredits').hasCredits;
const data = require('../components/movies/moviesDAL');

describe('Credit check', function () {    
    it('Should allow basic user with less than 5 movies to add movie',async function () {
        const stub = sinon.stub(data.prototype, 'checkNumber').returns({count: 4})
        const nextSpy = sinon.spy();
        
        await hasCredits(mocks.reqBasic, mocks.res, nextSpy);
        stub.restore();
        expect(nextSpy.called).to.be.true;
    });
    
        it('Should block basic user with 5 movies to add movie', async function () {
        const stub = sinon.stub(data.prototype, 'checkNumber').returns({count: 5})
        const nextSpy = sinon.spy();

        await hasCredits(mocks.reqBasic, mocks.res, nextSpy);
        stub.restore();
        expect(nextSpy.called).to.be.false;
    });

    it('Should block basic user with more than 5 movies to add movie', async function () {        
        const stub = sinon.stub(data.prototype, 'checkNumber').returns({count: 6})
        const nextSpy = sinon.spy();

        await hasCredits(mocks.reqBasic, mocks.res, nextSpy);
        stub.restore();
        expect(nextSpy.called).to.be.false;
    });

    it('Should allow premium user with more than 5 movies to add movie', async function () {
        const stub = sinon.stub(data.prototype, 'checkNumber').returns({count: 6})
        const nextSpy = sinon.spy();

        await hasCredits(mocks.reqPremium, mocks.res, nextSpy);
        stub.restore();
        expect(nextSpy.called).to.be.true;
    });
});