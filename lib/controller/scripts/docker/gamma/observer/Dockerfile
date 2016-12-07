FROM node

RUN mkdir -p /observer

WORKDIR /observer

ADD . /observer

RUN npm install

CMD ["node", "/observer/app.js"]