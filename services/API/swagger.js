const swaggerAutogen = require('swagger-autogen')()
var env = require('./src/utils/environment')

const doc = {
    info: {
        version: "1.0.0",
        title: "Movie API",
        description: "A simple Movie API for the Netguru Node.js recruitment task "
    },
    host: "localhost:"+env.API_APP_PORT,
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Movies",
            "description": "Movie management"
        }
    ],
    securityDefinitions: {
        Key:{
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "Authorization",  // name of the header, query parameter or cookie
            description: "The token should be passed in request's Authorization header with format Authorization: Bearer token"
        }
    },
    
    definitions: {
        Movies: {
            title: "Godfather",
            released: "15 Nov 1991",
            genre: "Comedy, Drama, Romance",
            director: "Lal, Siddique"
        }
    }
    
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/app.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/app')           // Your project's root file
})