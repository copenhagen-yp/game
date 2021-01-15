import React from 'react';

import { APP_TEXT, API_URL } from '../../constants';
import { Field, Form, Input } from '../../components';
import { useForm } from '../../hooks';
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
];

export const SignIn = () => {
  const requiredFields = ['login', 'password'];
  const successResult = routes.home.path;
  const {
    handleSubmitSign,
    handleChange,
    handleBlur,
    error,
    fields: fieldsValues,
  } = useForm(requiredFields, successResult, API_URL.SIGN_IN);

  return (
    <Form
      handleSubmit={handleSubmitSign}
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
