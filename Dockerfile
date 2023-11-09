FROM node:16-alpine

WORKDIR /app

COPY ./package.json /app/

RUN yarn install

COPY . .

CMD ["yarn", "dev"]
