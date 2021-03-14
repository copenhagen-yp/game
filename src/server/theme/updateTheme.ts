import { Request, Response } from 'express';
import { fetchUserInfo } from '../fetchUserInfo';

export const updateTheme = async (req: Request, res: Response) => {
  if (req.cookies.authCookie && req.cookies.uuid) {
    const headerCookie = `uuid=${req.cookies.uuid}; authCookie=${req.cookies.authCookie}`;

    try {
      const userInfo = await fetchUserInfo(headerCookie);

      if(userInfo.id) {

        res.send(200);
      } else {
        res.send(401);
      }


    } catch (ex) {
      console.error(ex);
      res.send(401);
    }
  }
};
