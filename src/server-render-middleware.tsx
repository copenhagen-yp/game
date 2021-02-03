import React from 'react';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { Provider } from 'react-redux';
import App from './app';
import { configureStore } from './store';
const store = configureStore();



export const serverRenderMiddleware = (req: Request, res: Response) => {
  const location = req.url;
  const context: StaticRouterContext = {};
  const css: any = new Set(); // CSS for all rendered React components
  const insertCss = (...styles: any) => styles.forEach((style: any) => css.add(style._getCss()));
  const jsx = (
    <StaticRouter context={context} location={location}>
      <Provider store={store}>
        <StyleContext.Provider value={{ insertCss }}>
          <App />
        </StyleContext.Provider>
      </Provider>
    </StaticRouter>);
  const reactHtml = renderToString(jsx);

  const getHtml = (reactHtml: string) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg">
        <title>Game - SSR</title>
        <style>${[...Array.from(css)].join('')}</style>
    </head>
    <body>
        <div id="root">${reactHtml}</div>
        <script src="/main.js"></script>
    </body>
    </html>
    `;
  };

  res.send(getHtml(reactHtml));
};

