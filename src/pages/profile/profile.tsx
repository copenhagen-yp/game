import React, { useEffect, useState } from 'react';

import { Form } from '../../components';
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
const requiredFields = ['first_name', 'second_name', 'display_name', 'login', 'email', 'phone'];

export const Profile = () => {
  const { request: putUserInfoRequest } = useHttp(API_URL.EDIT_PROFILE, REQUEST_METHOD.PUT);
  const { request: getUserInfoRequest } = useHttp(API_URL.GET_USER_INFO, REQUEST_METHOD.GET);
  const { request: updateUserAvatarRequest } = useHttp(API_URL.UPDATE_AVATAR, REQUEST_METHOD.PUT, true)
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    error,
    fields: fieldsValues,
    setFields,
  } = useForm(putUserInfoRequest, requiredFields);
  const { getInfo } = userInfoApi(getUserInfoRequest);
  const { updateUserAvatar } = userInfoApi(updateUserAvatarRequest);
  const [avatarPath, setAvatarPath] = useState('');

  const handleChangeAvatar = (event: any) => {
    updateUserAvatar(event.target.files[0])
      .then((userFieldValues) => {
        if (userFieldValues.avatar) {
          setAvatarPath(`${API_URL.DOMAIN}${userFieldValues.avatar}`);
        }
      });
  };

  useEffect(() => {
    getInfo()
      .then((userFieldValues) => {
        if (Object.prototype.toString.call(userFieldValues) !== '[object Object]') {
          return;
        }

        if (userFieldValues.avatar) {
          setAvatarPath(`${API_URL.DOMAIN}${userFieldValues.avatar}`);
        }

        const currentFieldValues = Object.keys(userFieldValues)
          .reduce((acc, key) => (requiredFields.includes(key) ? { ...acc, [key]: userFieldValues[key] } : acc), {});

        setFields((prevState: any) => ({ ...prevState, ...currentFieldValues }));
      })
  }, []);

  return (
    <main className={styles.profile}>
      <label>
        <img className={styles.profile__avatarImage} src={avatarPath} alt="avatar"/>
        <input onChange={handleChangeAvatar} className={styles.profile__avatarInput} type="file"/>
      </label>
      <Form
        wrapperClassName={styles.profile__formWrapper}
        error={error}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        submitButtonText={APP_TEXT.PROFILE_SUBMIT_BUTTON_TEXT}
        title={APP_TEXT.PROFILE_TITLE}
        fields={profileFields}
        fieldsValues={fieldsValues}
      />
    </main>
  );
}
