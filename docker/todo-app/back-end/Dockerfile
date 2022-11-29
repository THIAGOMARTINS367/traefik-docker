FROM node:14-alpine AS build

EXPOSE 3001

WORKDIR /usr/src/app-backend

ADD node_modules.tar.gz ./

COPY ["./","./"]

RUN npm install

ENTRYPOINT if [ $DEV = true ]; then npm rum dev; else npm start; fi
