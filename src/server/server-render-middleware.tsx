import React from 'react';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { Provider } from 'react-redux';
import App from '../app';
import { configureStore } from '../store';
import { defaultReducer as userReducerState } from '../store/user/reducer';
import { ThemeUser } from './theme/models/themeUser';
import { Theme } from './theme/models/theme';
import { Themes } from '../store/user/types';
import { fetchUserInfo } from './fetchUserInfo';

export const serverRenderMiddleware = async (req: Request, res: Response) => {
  const location = req.url;
  const context: StaticRouterContext = {};
  const css: any = new Set(); // CSS for all rendered React components
  const insertCss = (...styles: any) => styles.forEach((style: any) => css.add(style._getCss()));

  let preloadedState: any;

  if (req.cookies.authCookie && req.cookies.uuid) {
    const headerCookie = `uuid=${req.cookies.uuid}; authCookie=${req.cookies.authCookie}`;

    try {
      const userInfo = await fetchUserInfo(headerCookie);

      // TODO: Обработка ошибок (в т.ч. cookie is not valid)

      if (userInfo.id) {

        let themeUser = await ThemeUser.findOne({
          where: { userId: userInfo.id },
        });

        const baseTheme = await Theme.findOne({
          where: { name: Themes.light },
        });

        if (!themeUser && baseTheme) {
          themeUser = await ThemeUser.create({
            userId: userInfo.id,
            themeId: baseTheme.id,
          });
        }

        const currentTheme = await  Theme.findOne({
          where: {
            id: themeUser?.themeId,
          }
        });

        userInfo.theme = currentTheme?.name || Themes.light;
      }

      preloadedState = {
        user: {
          ...userReducerState,
          userInfo,
        },
      };
    } catch (ex) {
      console.error(ex);
    }
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
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <meta http-equiv='X-UA-Compatible' content='ie=edge'>
        <link rel='shortcut icon' type='image/png' href='/images/favicon.jpg'>
        <title>Game - SSR</title>
        <style>${[...Array.from(css)].join('')}</style>
    </head>
    <body>
        <div id='root' style='height: 100%'>${reactHtml}</div>
        <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/recipes/server-rendering/#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
        <script src='/main.js'></script>
    </body>
    </html>
    `;
  };

  if (context.url) {
    res.writeHead(302, {
      Location: context.url,
    });
    res.end();
  } else {
    res.write(getHtml(reactHtml, finalState));
    res.end();
  }
};
