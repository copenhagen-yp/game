import React from 'react';

import { APP_TEXT, API_URL } from '../../constants';
import { Form } from '../../components';
import { useHttp, useForm } from '../../hooks';
import { routes } from '../../routes';

const signInFields = [
  {
    type: 'text',
    name: 'login',
    label: 'Логин',
  },
  {
    type: 'password',
    name: 'password',
    label: 'Пароль',
  },
]

export const SignIn = () => {
  const requiredFields = ['login', 'password'];
  const successResult = routes.home.path;
  const { request } = useHttp(API_URL.SIGN_IN);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    error
  } = useForm(request, requiredFields, successResult);

  return (
    <Form
      error={error}
      handleBlur={handleBlur}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      submitButtonText={APP_TEXT.AUTH_TEXT}
      title={APP_TEXT.ENTER}
      fields={signInFields}
    />
  )
};
