FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci
#RUN npm install -g nodemon

RUN mkdir ./src
COPY /src ./src

CMD ["node", "./src/bin/www"]
#ENTRYPOINT ["nodemon", "/app/server.js"]
