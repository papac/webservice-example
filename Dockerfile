FROM node:8.11.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG port=3000
ARG service=app

COPY package.json package-lock.json ./
RUN yarn

COPY . .

ENV ENV_SERVICE=${service}
ENV PORT=${port}

EXPOSE ${port}

CMD [ "node", "./bin/www" ]