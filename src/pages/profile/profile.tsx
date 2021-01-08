import React, { useEffect, useState } from 'react';
import { Form } from '../../components';
import { API_URL, APP_TEXT } from '../../constants';
import { useForm, useHttp } from '../../hooks';
import { formFieldsType } from './types';

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
  const { request } = useHttp(API_URL.EDIT_PROFILE);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    error
  } = useForm(request, requiredFields);
  const [fields, setFields] = useState(profileFields);

  useEffect(() => {
    setTimeout(() => {
      profileFields[0].label = 'aaa';

      setFields(profileFields);
    }, 3000);
  }, []);

  return (
    <main>
      <Form
        error={error}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        submitButtonText={APP_TEXT.PROFILE_SUBMIT_BUTTON_TEXT}
        title={APP_TEXT.PROFILE_TITLE}
        fields={fields}
      />
    </main>
  );
}
