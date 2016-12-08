FROM node

ARG observer_path
ARG nfunc
ARG nuser

RUN npm install

RUN mkdir -p /observer
COPY . /observer

ENV FUNC_NAME $nfunc
ENV USER_NAME $nuser

WORKDIR /observer

CMD ["node", "/observer/app.js"]