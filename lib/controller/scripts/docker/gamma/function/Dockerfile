FROM {{registry}}/event-handler-{{env}}:{{env_ver}}

ARG code
ARG nfunc
ARG nuser

COPY $code/index.js /code/user-event-handler/index.js 
# COPY $code/lib /code/node_modules

ENV PORT 3000
ENV FUNC_NAME $nfunc
ENV USER_NAME $nuser


CMD ["node", "/code/app.js"]

EXPOSE 3000
