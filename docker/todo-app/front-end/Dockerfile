FROM node:14-alpine AS build

EXPOSE 3000

WORKDIR /usr/src/app

ADD node_modules.tar.gz ./

COPY ["./","./"]

RUN npm install

ENTRYPOINT ["npm", "start"]
