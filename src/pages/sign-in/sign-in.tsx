import React from 'react';
import { Link } from 'react-router-dom';

import { APP_TEXT, API_URL } from '../../constants';
import { Button, Field, Form, Input } from '../../components';
import { useForm } from '../../hooks';
import { routes } from '../../routes';

import styles from '../sign-in-up.pcss';

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
    fields: fieldsValues
  } = useForm(requiredFields, successResult, API_URL.SIGN_IN);

  const handleOauthClick = () => {
    console.log('hi');
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Form
          onSubmit={handleSubmitSign}
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
        <Button
          className={styles.oauthButton}
          onClick={handleOauthClick}
        >Авторизоваться с помощью Яндекса</Button>
        <Link to={routes.signUp.path}>
          <Button>
            Зарегистрироваться
          </Button>
        </Link>
      </div>
    </div>
  );
};
