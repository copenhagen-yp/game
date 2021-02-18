import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

import { API_URL } from './constants';

const fetchCookie = (req: Request) => {
  return axios({
    method: 'post',
    url: API_URL.API_DOMAIN + API_URL.OAUTH_CODE,
    data: {
      code: req.query.code,
    },
  });
};

export const oauthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.query.code) {
    const cookie = await fetchCookie(req);

    req.query.auth_cookie = cookie.headers['set-cookie']
      .reduce((cookies: any, cookie: any) => {
        const match_cookie = cookie.match(/(.*?)=(.*?);/);

        cookies[match_cookie[1]] = match_cookie[2];

        return cookies;
      }, {});
  }

  next();
};
