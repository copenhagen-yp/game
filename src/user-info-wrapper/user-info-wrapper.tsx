import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { API_URL } from '../constants';
import * as userActions from '../store/user/actions';
import { useHttp } from '../hooks';
import { userInfoWrapperProps } from 'user-info-wrapper/types';

export const UserInfoWrapper: FC<userInfoWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
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

    init();
  }, []);

  if (isLoading) {
    return <div>Загрузка пользователя</div>;
  }

  return <>
    {children}
  </>;
};
