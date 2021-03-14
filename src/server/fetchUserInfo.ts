import { https } from 'follow-redirects';

function fetchUserInfo(cookie: string): Promise<any> {
  return new Promise((resolve) => {
    https.get({
      hostname: 'ya-praktikum.tech',
      path: '/api/v2/auth/user',
      headers: {
        'cookie': cookie,
        'accept': 'application/json',
      },
    }, (res) => {
      let str = '';

      //another chunk of data has been received, so append it to `str`
      res.on('data', function(chunk) {
        str += chunk;
      });

      res.on('error', (err) => {
        console.error(err);
      });

      //the whole response has been received, so we just print it out here
      res.on('end', function() {
        resolve(JSON.parse(str));
      });

    }).on('error', err => {
      console.error(err);
    });
  });
}

export {
  fetchUserInfo
};
