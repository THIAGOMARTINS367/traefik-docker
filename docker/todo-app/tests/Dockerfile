FROM mjgargani/puppeteer:trybe1.0 AS build

ENV FRONT_HOST=todofrontend

ENV FRONT_PORT=3000

WORKDIR /usr/local/bin

ADD node_modules.tar.gz ./

COPY ["./","./"]

RUN npm install

ENTRYPOINT ["npm", "test"]
