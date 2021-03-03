import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import { APP_TEXT, API_URL } from '../../constants';
import { Field, Form, Textarea } from '../../components';
import { useForm } from '../../hooks';

import styles from '../sign-in-up.pcss';

const signInFields = [
  {
    name: 'massage',
    label: 'Сообщение',
  },
];

export const Feedback = withStyles(styles)(() => {
  const requiredFields = ['massage'];

  const {
    handleSubmitSign,
    handleChange,
    handleBlur,
    error,
    fields: fieldsValues
  } = useForm({ requiredFields, url: API_URL.FEEDBACK });

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Form
          onSubmit={handleSubmitSign}
          submitButtonText={APP_TEXT.BTN_SEND}
          title={'Обратная связь'}
        >
          {signInFields.map((field) => (
            <Field
              key={field.name}
              label={field.label}
              error={error[field.name]}
            >
              <Textarea
                name={field.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error[field.name]}
                value={fieldsValues[field.name] || ''}
              />
            </Field>
          ))}
        </Form>
      </div>
    </div>
  );
});
