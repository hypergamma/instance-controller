FROM node

ARG observer_path
ARG nfunc
ARG nuser

RUN mkdir -p /observer
COPY $observer_path /observer

ENV FUNC_NAME $nfunc
ENV USER_NAME $nuser

WORKDIR /observer
RUN npm install

CMD ["node", "/observer/app.js"]