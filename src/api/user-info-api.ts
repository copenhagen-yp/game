import { Options } from '../hooks/types';
import { API_URL, REQUEST_METHOD } from '../constants';

export const userInfoApi = (request: { (url:string, options?: Options): Promise<any> }) => {
  const getInfo = () => {
    return request(
      API_URL.GET_USER_INFO,
      { method: REQUEST_METHOD.GET })
  }

  const updateUserAvatar = (image: any) => {
    if (!image) {
      return Promise.reject();
    }

    const formData = new FormData();
    const headers = new Headers();

    formData.append('avatar', image);

    return request(
      API_URL.UPDATE_AVATAR,
      {
        method: REQUEST_METHOD.PUT,
        headers,
        body: formData
      })
  }

  return {
    getInfo,
    updateUserAvatar,
  }
};
