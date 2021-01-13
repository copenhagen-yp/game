FROM node:lts-alpine as builder

ARG PORT=8080
RUN echo $PORT
EXPOSE $PORT

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM nginx:1.17-alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
