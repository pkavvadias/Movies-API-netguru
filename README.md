![CI/CD workflow](https://github.com/pkavvadias/Movies-API-netguru/actions/workflows/main.yml/badge.svg)
# Movie API

The simple Movie API provides two endpoints:

1. `POST /movies`
   1. Allows creating a movie object based on movie title passed in the request body
   2. Based on title, additional movie details are feched from OMDb API:
   ```
     Title: string
     Released: date
     Genre: string
     Director: string
   ```
   3. Only authorized users can create a movie.
   4. `Basic` users are restricted to create a 5 movies per month (calendar
      month). `Premium` users have no limits.
1. `GET /movies`
   1. Fetches a list of all movies created by an authorized user.

⚠️ Token should be passed in request's `Authorization` header to be authorized.

```
Authorization: Bearer <token>
```
Documentation about the API can also be found on `./assets/API Documentation.pdf`
## Example POST 

To add a movie call service using for example `curl`. We assume
that the service is running on port `3001`. Service adds movie to database
and responds with success code and movie details.  

Request

```
curl --location --request POST '0.0.0.0:3001/movies' \
--header 'Authorization: Bearer <token> \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'title=Harry Potter'

```

Response

```
{
    "status": "success",
    "data": {
        "title": "Harry Potter and the Deathly Hallows: Part 2",
        "released": "15 Jul 2011",
        "genre": "Adventure, Drama, Fantasy, Mystery",
        "director": "David Yates"
    }
}
```

## Example GET 

To get user movies call service using for example `curl`. We assume
that the service is running on port `3001`. Service gets movies on
database from the current user, along with id and user id.  

Request

```
curl --location --request GET '0.0.0.0:3001/movies' \
--header 'Authorization: Bearer <token>'

```

Response

```
{
    "status": "success",
    "data": [
        {
            "id": 66,
            "userid": 434,
            "date_added": "2021-04-12T00:00:00.000Z",
            "title": "Harry Potter and the Deathly Hallows: Part 2",
            "released": "2011-07-15T00:00:00.000Z",
            "genre": "Adventure, Drama, Fantasy, Mystery",
            "director": "David Yates"
        }
    ]
}
```
# Authorization service

To authorize users use the auth service based on JWT tokens.  
## Users

The auth service defines two user accounts that you should use  

1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```
## Example request

To authorize user call the auth service using for example `curl`. We assume
that the auth service is running on port `3000`.  

Request

```
curl --location --request POST '0.0.0.0:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
```

Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYxODIxODU1NiwiZXhwIjoxNjE4MjIwMzU2LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.aHn18NijgXhvEqYxHXmvnqj2ONNB82KWcCGK_IX2Mqw"
}
```
## Run 
To build and run locally you need to have `docker` and `docker-compose` installed  

# Run tests locally 
1. Clone this repository   
2. Run from root dir  

```
docker-compose -f docker-compose-test.yml up -d stage_database  
docker-compose -f docker-compose-test.yml build --no-cache api  
```
That way, a stage database having the same schema with the production database is set  
At the build stage, unit tests as well as integration tests are executed  

⚠️ Parameters are as declared on .env file at the root dir. If you wish to change them please edit this file   
![tests](https://github.com/pkavvadias/Movies-API-netguru/blob/master/assets/test_results.PNG)  
Code coverage is 98.99%     
![code coverage](https://github.com/pkavvadias/Movies-API-netguru/blob/master/assets/code_coverage.PNG)

# Run production environment
1. Clone this repository  
2. Run from root dir  

```
docker-compose build --no-cache  
docker-compose up -d  
```
Three containers are created:  
1. The authorization service
2. PostgreSQL database
3. The Movie API service

⚠️ Parameters are as declared on .env file at the root dir. If you wish to change them please edit this file  

## Rules

- Database and framework choice are on your side.
- Your API has to be dockerized. Create `Dockerfile` and `docker-compose` and document the process of running it locally.
- Provided solution should consist of two microservices.
  - `Authentication Service` - provided by us to auth users
  - `Movies Service` - created by you to handle movies data
- Test your code.
- Provide documentation of your API.
- Application should be pushed to the public git repository and should have a
  working CI/CD pipeline that runs the tests. For example you can use GitHub
  Actions or CircleCI. Create a sample PR to show us the working CI/CD pipeline.

## What will be evaluated?

- Task completeness
- Architecture
- Code quality
- Tests quality
- Database design
- Technology stack
