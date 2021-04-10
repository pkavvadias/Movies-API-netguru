'use strict'

const jwt = require('jsonwebtoken')
const env = require('../utils/environment');
const { mockRequest, mockResponse } = require('mock-req-res');

const bearer_token_basic = "Bearer " + jwt.sign(
  {
    userId: 100,
    name: 'test-basic',
    role: 'basic',
  },
  env.JWT_SECRET,
  {
    issuer: 'https://www.netguru.com/',
    subject: '100',
    expiresIn: 30 * 60,
  }
);

const bearer_token_premium = "Bearer " + jwt.sign(
  {
    userId: 101,
    name: 'test-premium',
    role: 'premium',
  },
  env.JWT_SECRET,
  {
    issuer: 'https://www.netguru.com/',
    subject: '101',
    expiresIn: 30 * 60,
  }
);

const mock_movie = {
  Title: 'test',
  Released: '1821-01-01',
  Genre: 'test',
  Director: 'test',
  Response: 'True'
}

const res = mockResponse();
const reqBasic = mockRequest({ headers: { authorization: bearer_token_basic }, user: { role: 'basic' } });
const reqPremium = mockRequest({ headers: { authorization: bearer_token_premium }, user: { role: 'premium' } });
const reqInvalidToken = mockRequest({ headers: { authorization: 'testest' } });
const reqEmpty = mockRequest();

module.exports = {
  token_basic: bearer_token_basic,
  token_premium: bearer_token_premium,
  mock_movie: mock_movie,
  res: res,
  reqBasic: reqBasic,
  reqPremium: reqPremium,
  reqInvalidToken: reqInvalidToken,
  reqEmpty: reqEmpty
}