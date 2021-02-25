import path from 'path';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import { serverRenderMiddleware } from './server-render-middleware';
import mongoose from 'mongoose';
import configDB from '../database';

const app = express();

mongoose.connect(configDB.url, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.use(cookieParser());

app.use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use('/images', express.static(path.resolve(__dirname, '../src/images')));

app.get('/*', serverRenderMiddleware);

export { app };
