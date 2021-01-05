import React from 'react';

import { APP_TEXT, API_URL } from '../../constants';
import { Field, Input, Button } from '../../components';
import { useHttp, useForm } from '../../hooks';
import { routes } from '../../routes';
import styles from './sign-up.pcss';

export const SignUp = () => {
  const requiredFields = ['first_name', 'second_name', 'login', 'email', 'password', 'phone'];
  const successResult = routes.signIn.path;
  const { request } = useHttp(API_URL.SIGN_UP);
  const { 
    handleSubmit, 
    handleChange, 
    handleBlur,
    error } = useForm(request, requiredFields, successResult);
  
  return (
    <div className={styles.form__wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form__header}>
          <h3>{APP_TEXT.REGISTRATION}</h3>
        </div>
        <div className={styles.form__body}>
          <Field className={styles.form__item} label='Имя' error={error.first_name}>
            <Input 
              type='text'
              name='first_name'
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.first_name}
            />
          </Field>
          <Field className={styles.form__item} label='Фамилия' error={error.second_name}>
            <Input 
              type='text'
              name='second_name'
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.second_name}
            />
          </Field>
          <Field className={styles.form__item} label='Логин' error={error.login}>
            <Input 
              type='text'
              name='login'
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.login}
            />
          </Field>
          <Field className={styles.form__item} label='Почта' error={error.email}>
            <Input 
              type='text'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.email}
            />
          </Field>
          <Field className={styles.form__item} label='Пароль' error={error.password}>
            <Input 
              name='password'
              type='password' 
              onChange={handleChange} 
              onBlur={handleBlur}
              error={error.password}
            />
          </Field>
          <Field className={styles.form__item} label='Телефон' error={error.phone}>
            <Input 
              name='phone'
              type='text' 
              onChange={handleChange} 
              onBlur={handleBlur}
              error={error.phone}
            />
          </Field>
        </div>
        <div className={styles.form__footer}>
          <Button >{APP_TEXT.REGISTRATION_BTN_TEXT}</Button>
        </div>
      </form>
    </div>
  )
};