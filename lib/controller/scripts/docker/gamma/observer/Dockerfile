FROM node

ARG func_imgname
ARG nfunc
ARG nuser

RUN mkdir -p /observer

WORKDIR /observer

ADD . /observer

RUN npm install

ENV FUNC_IMG_NAME $func_imgname
ENV FUNC_NAME $nfunc
ENV USER_NAME $nuser

CMD ["node", "/observer/app.js"]