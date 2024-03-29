import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import { Field, Form, Input } from '../../components';
import { API_URL, APP_TEXT, REQUEST_METHOD } from '../../constants';
import { useForm, useHttp } from '../../hooks';
import { formFieldsType } from './types';
import { userInfoApi } from '../../api';
import styles from './profile.pcss';

const profileFields: formFieldsType = [
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
    name: 'display_name',
    label: 'Никнейм',
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
];
const requiredProfileFields = ['first_name', 'second_name', 'display_name', 'login', 'email', 'phone'];
const passwordFields: formFieldsType = [
  {
    type: 'password',
    name: 'oldPassword',
    label: 'Старый пароль',
  },
  {
    type: 'password',
    name: 'newPassword',
    label: 'Новый пароль',
  },
];
const requiredPasswordFields = ['oldPassword', 'newPassword'];

export const Profile = withStyles(styles)(() => {
  const { request: getUserInfoRequest } = useHttp();
  const { request: updateUserAvatarRequest } = useHttp();

  const {
    handleSubmit: handleSubmitProfile,
    handleChange: handleChangeProfile,
    handleBlur: handleBlurProfile,
    error: errorProfile,
    fields: profileFieldsValues,
    setFields: setFieldsProfile,
  } = useForm({ requiredFields: requiredProfileFields, url: API_URL.EDIT_PROFILE, method: REQUEST_METHOD.PUT });

  const { getInfo } = userInfoApi(getUserInfoRequest);
  const { updateUserAvatar } = userInfoApi(updateUserAvatarRequest);
  const [avatarPath, setAvatarPath] = useState('');

  const {
    handleSubmit: handleSubmitPassword,
    handleChange: handleChangePassword,
    handleBlur: handleBlurPassword,
    error: passwordError,
    fields: passwordFieldsValues,
  } = useForm({ requiredFields: requiredPasswordFields, url: API_URL.CHANGE_PASSWORD, method: REQUEST_METHOD.PUT });

  const handleChangeAvatar = (event: any) => {
    updateUserAvatar(event.target.files[0])
      .then((userFieldValues: any) => {
        if (userFieldValues.avatar) {
          setAvatarPath(`${API_URL.DOMAIN}${userFieldValues.avatar}`);
        }
      });
  };

  useEffect(() => {
    getInfo()
      .then((userFieldValues: any) => {
        if (Object.prototype.toString.call(userFieldValues) !== '[object Object]') {
          return;
        }

        if (userFieldValues.avatar) {
          setAvatarPath(`${API_URL.DOMAIN}${userFieldValues.avatar}`);
        }

        const currentFieldValues = Object.keys(userFieldValues)
          .reduce((acc, key) => (requiredProfileFields.includes(key) ? { ...acc, [key]: userFieldValues[key] } : acc), {});

        setFieldsProfile((prevState: any) => ({ ...prevState, ...currentFieldValues }));
      });
  }, []);

  return (
    <main className={styles.profile}>
      <div className={styles.profile__formsWrapper}>
        <Form
          wrapperClassName={styles.profile__formWrapper}
          formClassName={styles.profile__form}
          onSubmit={handleSubmitProfile}
          submitButtonText={APP_TEXT.PROFILE_SUBMIT_BUTTON_TEXT}
          title={APP_TEXT.PROFILE_FORM_TITLE}
        >
          {profileFields.map((field) => (
            <Field
              key={field.name}
              label={field.label}
              error={errorProfile[field.name]}
            >
              <Input
                type={field.type}
                name={field.name}
                onChange={handleChangeProfile}
                onBlur={handleBlurProfile}
                error={errorProfile[field.name]}
                value={profileFieldsValues[field.name] || ''}
              />
            </Field>
          ))}
        </Form>
        <div className={styles.profile__rightBlock}>
          <label>
            <div className={styles.profile__avatarWrapper}>
              <img className={styles.profile__avatarImage} src={avatarPath || APP_TEXT.DEFAULT_AVATAR} alt="avatar"/>
              <span className={styles.profile__avatarTextLayer}>Изменить аватар</span>
            </div>
            <input onChange={handleChangeAvatar} className={styles.profile__avatarInput} type="file"/>
          </label>
          <Form
            wrapperClassName={styles.profile__formWrapper}
            formClassName={styles.profile__form}
            onSubmit={handleSubmitPassword}
            submitButtonText={APP_TEXT.PROFILE_SUBMIT_BUTTON_TEXT}
            title={APP_TEXT.PASSWORD_FORM_TITLE}
          >
            {passwordFields.map((field) => (
              <Field
                key={field.name}
                className={styles.form__item}
                label={field.label}
                error={passwordError[field.name]}
              >
                <Input
                  type={field.type}
                  name={field.name}
                  onChange={handleChangePassword}
                  onBlur={handleBlurPassword}
                  error={passwordError[field.name]}
                  value={passwordFieldsValues[field.name] || ''}
                />
              </Field>
            ))}
          </Form>
        </div>
      </div>
    </main>
  );
});
