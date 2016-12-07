FROM {{registry}}/event-handler-{{env}}:{{env_ver}}

ARG code

ADD $code /code/user-event-handler/

ENV PORT 3000

CMD ["node", "/code/app.js"]

EXPOSE 3000
