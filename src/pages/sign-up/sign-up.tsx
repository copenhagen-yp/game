import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';

import { APP_TEXT, API_URL } from '../../constants';
import { Field, Input, Form, Button } from '../../components';
import { useForm, useHttp } from '../../hooks';
import { routes } from '../../routes';
import { generateOauthLink, oauthApi } from '../../api/oauth';

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
  const { request: getServiceIdRequest } = useHttp();
  const { getServiceId } = oauthApi(getServiceIdRequest);

  const {
    handleSubmitSign,
    handleChange,
    handleBlur,
    error,
    fields: fieldsValues
  } = useForm(requiredFields, successResult, API_URL.SIGN_UP);

  const handleOauthClick = () => {
    getServiceId()
      .then(({ service_id }) => {
        document.location.href = generateOauthLink(service_id);
      });
  };

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
