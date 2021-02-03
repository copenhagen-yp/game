import path from 'path';
import compression from 'compression';
import express from 'express';
import { serverRenderMiddleware } from './server-render-middleware';

const app = express();

app.use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use('/images', express.static(path.resolve(__dirname, '../src/images')));

app.get('/*', serverRenderMiddleware);

export { app };
