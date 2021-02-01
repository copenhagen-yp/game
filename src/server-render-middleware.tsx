import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import App from './app';

export const serverRenderMiddleware = (req: Request, res: Response) => {
  const location = req.url;
  const context: StaticRouterContext = {};
  const jsx = (
    <StaticRouter context={context} location={location}>
      <App />
    </StaticRouter>);
  const reactHtml = renderToString(jsx);

  res.send(getHtml(reactHtml));
};

const getHtml = (reactHtml: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg">
      <title>Sneakers shop</title>
      <link href="/main.css" rel="stylesheet">
  </head>
  <body>
      <div id="mount">${reactHtml}</div>
      <script src="/main.js"></script>
  </body>
  </html>
  `;
};
