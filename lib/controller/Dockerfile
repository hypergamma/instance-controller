FROM node

RUN mkdir -p /controller

WORKDIR /controller

ADD . /controller

RUN npm install

EXPOSE 8080

CMD ["node", "/controller/app.js"]