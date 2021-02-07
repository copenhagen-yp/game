import React from 'react';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { https } from 'follow-redirects';
import { Request, Response } from 'express';
import { Provider } from 'react-redux';
import App from './app';
import { configureStore } from './store';

function fetchUserInfo() {
  return new Promise((resolve) => {
    https.get({
      hostname: 'ya-praktikum.tech',
      path: '/api/v2/auth/user',
      headers: {
        'cookie': process.env.DEBUG_USER_COOKIE,
        'accept': 'application/json'
      }
    }, (res) => {
      let str = '';

      //another chunk of data has been received, so append it to `str`
      res.on('data', function (chunk) {
        str += chunk;
      });

      res.on('error', (err) => { console.error(err); });

      //the whole response has been received, so we just print it out here
      res.on('end', function () {
        resolve(JSON.parse(str));
      });

    }).on('error', err => {
      console.error(err);
    });
  });
}

export const serverRenderMiddleware = async (req: Request, res: Response) => {
  const location = req.url;
  const context: StaticRouterContext = {};
  const css: any = new Set(); // CSS for all rendered React components
  const insertCss = (...styles: any) => styles.forEach((style: any) => css.add(style._getCss()));

  let preloadedState: any;

  try {
    const userInfo = await fetchUserInfo();
    // TODO: Обработка ошибок (в т.ч. cookie is not valid)

    preloadedState = {
      user: {
        userInfo
      }
    };
  } catch (ex) {
    console.error(ex);
  }

  const store = configureStore(preloadedState);
  const finalState = store.getState();

  const jsx = (

    <StyleContext.Provider value={{ insertCss }}>
      <StaticRouter context={context} location={location}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </StyleContext.Provider>
  );
  const reactHtml = renderToString(jsx);

  const getHtml = (reactHtml: string, preloadedState: any) => {

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
        <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/recipes/server-rendering/#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
        <script src="/main.js"></script>
    </body>
    </html>
    `;
  };

  res.send(getHtml(reactHtml, finalState));
};

