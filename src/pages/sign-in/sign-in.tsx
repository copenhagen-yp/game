import React from 'react';

import { APP_TEXT, API_URL, REQUEST_METHOD } from '../../constants';
import { Field, Form, Input } from '../../components';
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
  const { request } = useHttp(API_URL.SIGN_IN, REQUEST_METHOD.POST);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    error,
    fields: fieldsValues,
  } = useForm(request, requiredFields, successResult);

  return (
    <Form
      handleSubmit={handleSubmit}
      submitButtonText={APP_TEXT.AUTH_TEXT}
      title={APP_TEXT.ENTER}
    >
      {signInFields.map((field) => (
        <Field
          key={field.name}
          label={field.label}
          error={error[field.name]}
        >
          <Input
            type={field.type}
            name={field.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={error[field.name]}
            value={fieldsValues[field.name] || ''}
          />
        </Field>
      ))}
    </Form>
  )
};
