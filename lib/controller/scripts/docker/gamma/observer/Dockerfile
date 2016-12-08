FROM node

ARG func_imgname
ARG nfunc
ARG nuser

RUN npm install
COPY . /observer

RUN mkdir -p /observer

ENV FUNC_NAME $nfunc
ENV USER_NAME $nuser

CMD ["node", "/observer/app.js"]