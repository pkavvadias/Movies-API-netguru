'use strict'

const jwt = require('jsonwebtoken')
const env = require('../utils/environment');

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
    Director:'test',
    Response: 'True'
  }

  module.exports = {
    token_basic: bearer_token_basic,
    token_premium: bearer_token_premium,
    mock_movie: mock_movie
  }