import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

import { API_URL } from './constants';
import { getCookie } from './helpers/get-cookie';

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
    let response;

    try {
      response = await fetchCookie(req);

      req.query.auth_cookie = getCookie(response.headers['set-cookie']);
    } catch (err) {
      next();
    }
  }

  next();
};
