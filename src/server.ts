import path from 'path';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import fs from 'fs';
import https from 'https';

import webpack from 'webpack';
import webpackConfig from '../webpack/client.config';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const webpackCompiler = webpack(webpackConfig);

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { serverRenderMiddleware } from './server-render-middleware';
import { apiRouter } from './app/api-router';

const app = express();

app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
}));

app.use(webpackHotMiddleware(webpackCompiler));

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

app.use(cookieParser());

app.use(compression());

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/images', express.static(path.resolve(__dirname, '../src/images')));

app.use('/api', apiRouter);

app.get('/*', serverRenderMiddleware);

const server = https.createServer({ key: key, cert: cert }, app);

export { server };
