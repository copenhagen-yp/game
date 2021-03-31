export const getCookie = (cookies: any[]) => {
  return cookies
    .reduce((cookies: any, cookie: any) => {
      const match_cookie = cookie.match(/(.*?)=(.*?);/);

      cookies[match_cookie[1]] = match_cookie[2];

      return cookies;
    }, {});
};
