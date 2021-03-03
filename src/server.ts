import path from 'path';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import { serverRenderMiddleware } from './server-render-middleware';
import { testMongoDb } from './app/test-mongo-data';

const app = express();

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

    console.log('Mongo successfully connected');

    testMongoDb();
  });

app.use(cookieParser());

app.use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use('/images', express.static(path.resolve(__dirname, '../src/images')));

app.get('/*', serverRenderMiddleware);

export { app };
