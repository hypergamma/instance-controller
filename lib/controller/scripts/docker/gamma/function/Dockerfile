FROM {{registry}}/event-handler-{{env}}:{{env_ver}}

ARG code
ARG nfunc
ARG nuser

ADD $code /code/user-event-handler/

ENV PORT 3000
ENV FUNC_NAME $nfunc
ENV USER_NAME $nuser


CMD ["node", "/code/app.js"]

EXPOSE 3000
