import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { API_URL } from '../constants';
import * as userActions from '../store/user/actions';
import { useHttp } from '../hooks';
import { userInfoWrapperProps } from 'user-info-wrapper/types';
import { getParamByKey } from '../helpers/getParams';
import { oauthApi } from '../api/oauth';

export const UserInfoWrapper: FC<userInfoWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // const { request: getServiceIdRequest } = useHttp();
  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    if (getParamByKey('code')) {
      const { sendOauthCode } = oauthApi(request);
      const param = getParamByKey('code');

      sendOauthCode(param)
        .then(() => {
          window.location.search = '';
          init();
        });
    } else {
      init();
    }

    async function init() {
      request(API_URL.GET_USER_INFO)
        .then((resp) => {
          dispatch(userActions.setUserInfo(resp));
        })
        .catch(() => dispatch(userActions.setUserInfo(null)))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return null;
  }

  return <>
    {children}
  </>;
};
