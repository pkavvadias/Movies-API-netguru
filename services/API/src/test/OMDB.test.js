'use strict'

const expect = require("chai").expect;
const sinon = require('sinon');
const axios = require('axios');
const mocks = require('./mocks')
const OMDB = require('../utils/OMDB');

const stub = sinon.stub(axios,'get');

describe('OMDB function test', function () {

    it('Should return movie object', async function () {
        stub.resolves(mocks.OMDBmock_correct);
        expect(await OMDB.movieInfo('Godfather')).to.deep.equal(mocks.godfather_object);

    });
    it('Should return false if movie not found', async function () {
        stub.resolves(mocks.OMDBmock_false);
        expect(await OMDB.movieInfo('testest')).to.deep.equal(false);

    });
});
stub.restore();