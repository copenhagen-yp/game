import path from 'path';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import fs from 'fs';
import https from 'https';

import { serverRenderMiddleware } from './server-render-middleware';
import { apiRouter } from './api-router';
import { sequelize } from './sequelize';
import { Topic, Author, Message } from './forum/models';

// import { Theme } from './theme/models/theme';
// import { Themes } from '../store/user/types';

const app = express();

const key = fs.readFileSync('./certs/key.pem');
const cert = fs.readFileSync('./certs/cert.pem');

mongoose.connect(
  'mongodb://mongo:27017/feedback-db',
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
  Author.hasMany(Topic);
  Topic.belongsTo(Author);

  Author.hasMany(Message);
  Message.belongsTo(Author);

  Topic.hasMany(Message);
  Message.belongsTo(Topic);

  await sequelize.sync();
})();

app.use(cookieParser());

app.use(compression());

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/images', express.static(path.resolve(__dirname, '../src/images')));

app.use('/api', apiRouter);

app.get('/*', serverRenderMiddleware);

const server = https.createServer({ key: key, cert: cert }, app);

export { server };
