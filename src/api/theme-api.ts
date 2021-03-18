import { API_URL, REQUEST_METHOD } from './../constants';
import { Options } from '../hooks/types';

export const themeApi = (request: { (url: string, options?: Options): Promise<any> }) => {
  const setTheme = (theme: string) => {
    return request(
      API_URL.THEME,
      {
        body: JSON.stringify({
          theme,
        }),
        method: REQUEST_METHOD.POST
      });
  };

  return { setTheme };
};
