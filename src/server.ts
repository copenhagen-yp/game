import path from 'path';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import fs from 'fs';
import https from 'https';

import { serverRenderMiddleware } from './server-render-middleware';
import { testMongoDb } from './app/test-mongo-data';

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

    console.log('Mongo successfully connected');

    testMongoDb();
  });

app.use(cookieParser());

app.use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use('/images', express.static(path.resolve(__dirname, '../src/images')));

app.get('/*', serverRenderMiddleware);

const server = https.createServer({ key: key, cert: cert }, app);

export { server };
