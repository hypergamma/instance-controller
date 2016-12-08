FROM {{registry}}/event-handler-{{env}}:{{env_ver}}

ARG code

ADD $code/index.js /code/user-event-handler/index.js 
ADD $code/lib /code/node_modules

ENV PORT 3000

CMD ["node", "/code/app.js"]

EXPOSE 3000
