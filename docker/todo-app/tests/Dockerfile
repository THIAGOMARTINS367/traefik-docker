FROM mjgargani/puppeteer:trybe1.0 AS build

WORKDIR /usr/local/bin

ADD node_modules.tar.gz ./

COPY ["./","./"]

RUN npm install

ENTRYPOINT ["npm", "test"]
