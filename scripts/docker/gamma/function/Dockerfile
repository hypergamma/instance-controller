FROM {{registry}}/event-handler-{{env}}:{{env_ver}}

ARG code

ADD $code /code/user-event-handler/

CMD ["node", "/code/app.js"]
