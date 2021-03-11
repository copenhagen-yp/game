import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { API_URL } from '../constants';
import * as userSelectors from '../store/user/selectors';
import * as userActions from '../store/user/actions';
import { useHttp } from '../hooks';
import { userInfoWrapperProps } from 'user-info-wrapper/types';
import { getParamByKey } from '../helpers/get-params';
import { oauthApi } from '../api/oauth';

export const UserInfoWrapper: FC<userInfoWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { request } = useHttp();
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getCurrent);

  useEffect(() => {
    const oauthCode = getParamByKey('code');

    if (oauthCode) {
      const { sendOauthCode } = oauthApi(request);

      sendOauthCode(oauthCode)
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

  if (user) {
    return <>{children}</>;
  }

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};
