'use strict'

const expect = require("chai").expect;
const sinon = require('sinon');
const axios = require('axios');
const mocks = require('./mocks')
const OMDB = require('../utils/OMDB');

const stub = sinon.stub(axios,'get').resolves(mocks.OMDBmock_correct);

describe('OMDB function test', function () {
    it('Should return movie object', async function () {
        expect(await OMDB.movieInfo('Godfather')).to.deep.equal(mocks.godfather_object);
       
    })
})
stub.restore();