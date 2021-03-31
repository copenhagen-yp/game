FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./

CMD npm run db:migration && npm run db:seeds && npm run start
