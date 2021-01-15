import React from 'react';

import { APP_TEXT, API_URL } from '../../constants';
import { Field, Input, Form } from '../../components';
import { useForm } from '../../hooks';
import { routes } from '../../routes';

const signUpFields = [
  {
    type: 'text',
    name: 'first_name',
    label: 'Имя',
  },
  {
    type: 'text',
    name: 'second_name',
    label: 'Фамилия',
  },
  {
    type: 'text',
    name: 'login',
    label: 'Логин',
  },
  {
    type: 'text',
    name: 'email',
    label: 'Почта',
  },
  {
    type: 'text',
    name: 'phone',
    label: 'Телефон',
  },
  {
    type: 'password',
    name: 'password',
    label: 'Пароль',
  },
];

export const SignUp = () => {
  const requiredFields = ['first_name', 'second_name', 'login', 'email', 'password', 'phone'];
  const successResult = routes.home.path;
  const {
    handleSubmitSign,
    handleChange,
    handleBlur,
    error,
    fields: fieldsValues,
  } = useForm(requiredFields, successResult, API_URL.SIGN_UP);

  return (
    <Form
      handleSubmit={handleSubmitSign}
      submitButtonText={APP_TEXT.REGISTRATION_BTN_TEXT}
      title={APP_TEXT.REGISTRATION}
    >
      {signUpFields.map((field) => (
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
