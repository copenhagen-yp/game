import { Request, Response } from 'express';
import { Themes } from 'store/user/types';
import { fetchUserInfo } from 'server/fetchUserInfo';
import { Theme } from 'server/theme/model/theme';
import { ThemeUser } from 'server/themeUser/model/themeUser';

export const updateTheme = async (req: Request, res: Response) => {
  const { theme: newThemeName } = req.body;

  if (!newThemeName) {
    res.statusCode = 400;
    res.send('The name of theme is required');

    return;
  }

  if(!Object.keys(Themes).includes(newThemeName)) {
    res.statusCode = 400;
    res.send('The name of theme is not correct');

    return;
  }

  try {
    const headerCookie = `uuid=${req.cookies.uuid}; authCookie=${req.cookies.authCookie}`;

    const userInfo = await fetchUserInfo(headerCookie);

    const newTheme = await Theme.findOne({
      where: { name: newThemeName },
    });

    const themeUser = await ThemeUser.findOne({
      where: { userId: userInfo.id },
    });

    if(newTheme) {
      await themeUser?.setTheme(newTheme);
    }

  } catch {
    res.statusCode = 500;
    res.send('Some error occurred while update theme.');
  }

  res.send(200);
};
