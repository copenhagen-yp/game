import React from 'react';

import { APP_TEXT, API_URL } from '../../constants';
import { Field, Input, Button } from '../../components';
import { useHttp, useForm } from '../../hooks';
import styles from './sign-in.pcss';

export const Signin = () => {
  const requiredFields = ['login', 'password'];
  const successResult = '/';
  const { requestAuth } = useHttp(API_URL.SIGN_IN);
  const { 
    handleSubmit, 
    handleChange, 
    handleBlur,
    error } = useForm(requestAuth, requiredFields, successResult);
  
  return (
    <div className={styles.form__wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form__header}>
          <h3>{APP_TEXT.ENTER}</h3>
        </div>
        <div className={styles.form__body}>
          <Field className={styles.form__item} label='Логин' isError={error.login}>
            <Input 
              type='text'
              name='login'
              onChange={handleChange}
              onBlur={handleBlur}
              isError={error.login}
            />
          </Field>
          <Field className={styles.form__item} label='Пароль' isError={error.password}>
            <Input 
              name='password'
              type='password' 
              onChange={handleChange} 
              onBlur={handleBlur}
              isError={error.password}
            />
          </Field>
        </div>
        <div className={styles.form__footer}>
          <Button >{APP_TEXT.AUTH_TEXT}</Button>
        </div>
      </form>
    </div>
  )
};