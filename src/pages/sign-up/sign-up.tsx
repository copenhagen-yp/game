import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';

import { APP_TEXT, API_URL } from '../../constants';
import { Field, Input, Form, Button } from '../../components';
import { useForm, useOauthButton } from '../../hooks';
import { routes } from '../../routes';

import styles from '../sign-in-up.pcss';

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

export const SignUp = withStyles(styles)(() => {
  const requiredFields = ['first_name', 'second_name', 'login', 'email', 'password', 'phone'];
  const successResult = routes.home.path;

  const {
    handleSubmitSign,
    handleChange,
    handleBlur,
    error,
    fields: fieldsValues
  } = useForm({ requiredFields, successResult, url: API_URL.SIGN_UP });

  const {
    handleOauthClick
  } = useOauthButton();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Form
          onSubmit={handleSubmitSign}
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
        <Button
          className={styles.oauthButton}
          onClick={handleOauthClick}
        >Зарегистрироваться через Яндекс</Button>
        <Link to={routes.signIn.path}>
          <Button>
            Войти
          </Button>
        </Link>
      </div>
    </div>
  );
});
