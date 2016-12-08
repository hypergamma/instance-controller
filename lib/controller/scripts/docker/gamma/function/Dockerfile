FROM {{registry}}/event-handler-{{env}}:{{env_ver}}

ARG code

COPY $code/index.js /code/user-event-handler/index.js 
COPY $code/lib /code/node_modules

ENV PORT 3000

CMD ["node", "/code/app.js"]

EXPOSE 3000
