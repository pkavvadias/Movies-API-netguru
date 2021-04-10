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

const OMDBmock_correct = {
  Title: "Godfather",
  Year: "1991",
  Rated: "Not Rated",
  Released: "15 Nov 1991",
  Runtime: "150 min",
  Genre: "Comedy, Drama, Romance",
  Director: "Lal, Siddique",
  Writer: "Lal (screenplay,  story & dialogue), Siddique",
  Actors: "N.N. Pillai, Mukesh, Kanaka, Philomina",
  Plot: "Two youngsters from rival clans fall in love.",
  Language: "Malayalam",
  Country: "India",
  Awards: "2 wins.",
  Poster: "https://m.media-amazon.com/images/M/MV5BZTkyYzc5MGEtYTBiYS00ZmYyLThlZWUtOWY3ZWE4ZDhlN2MzXkEyXkFqcGdeQXVyMjM0ODk5MDU@._V1_SX300.jpg",
  Ratings: [{ "Source": "Internet Movie Database", "Value": "8.6/10" }],
  Metascore: "N/A",
  imdbRating: "8.6",
  imdbVotes: "3,022",
  imdbID: "tt0353496",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "N/A",
  Production: "N/A",
  Website: "N/A",
  Response: "True"
}
const godfather_object = {
  title: "Godfather",
  released: "15 Nov 1991",
  genre: "Comedy, Drama, Romance",
  director: "Lal, Siddique"
}
const OMDBmock_false = {
  Response: "False",
  Error: "Movie not found!"
}

module.exports = {
  token_basic: bearer_token_basic,
  token_premium: bearer_token_premium,
  mock_movie: mock_movie,
  res: res,
  reqBasic: reqBasic,
  reqPremium: reqPremium,
  reqInvalidToken: reqInvalidToken,
  reqEmpty: reqEmpty,
  OMDBmock_correct: OMDBmock_correct,
  godfather_object: godfather_object,
  OMDBmock_false: OMDBmock_false
}