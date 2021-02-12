import { Options } from '../hooks/types';
import { API_URL, REQUEST_METHOD } from '../constants';
import { formFieldsType } from '../pages/profile/types';

export const userInfoApi = (request: { (url:string, options?: Options): Promise<formFieldsType> }) => {
  const getInfo = () => request(API_URL.GET_USER_INFO);

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
      });
  };

  return {
    getInfo,
    updateUserAvatar,
  };
};
