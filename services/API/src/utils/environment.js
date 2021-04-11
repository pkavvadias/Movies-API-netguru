'use strict'

var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') })

module.exports = {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_URL: process.env.POSTGRES_URL,
    API_APP_PORT: process.env.API_APP_PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    OMDB_KEY: process.env.OMDB_KEY
}