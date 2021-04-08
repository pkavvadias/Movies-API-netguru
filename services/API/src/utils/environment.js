var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') })

module.exports = {
    API_APP_PORT: process.env.API_APP_PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    OMDB_KEY: process.env.OMDB_KEY
}