import path from 'path';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import fs from 'fs';
import https from 'https';
import http from 'http';

import { serverRenderMiddleware } from './server-render-middleware';
import { apiRouter } from './api-router';
import { sequelize } from './sequelize';
import { ThemeUser } from './themeUser/model/themeUser';
import { Theme } from './theme/model/theme';

const app = express();

let key, cert;

if (process.env.HTTPS_ENABLED === '1') {
  key = fs.readFileSync('./certs/key.pem');
  cert = fs.readFileSync('./certs/cert.pem');
}

mongoose.connect(
  `mongodb://${process.env.MONGO_HOST}:27017/feedback-db`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  function (err) {
    if (err) {
      throw err;
    }
  });


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

(async () => {
  await Theme.hasMany(ThemeUser);
  await ThemeUser.belongsTo(Theme);

  await sequelize.sync();
})();

app.use(cookieParser());

app.use(compression());

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/images', express.static(path.resolve(__dirname, '../src/images')));

app.use('/api', apiRouter);

app.get('/*', serverRenderMiddleware);

const server = process.env.HTTPS_ENABLED === '1' ? https.createServer({ key: key, cert: cert }, app) : http.createServer(app);

export { server };
