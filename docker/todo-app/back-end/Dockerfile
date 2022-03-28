FROM node:14-alpine

EXPOSE 3001

WORKDIR /usr/src/app

COPY ["../back-end","/usr/src/app"]

RUN npm install

RUN npm run build todobackend

RUN npm start
