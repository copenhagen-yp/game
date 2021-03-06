import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import { APP_TEXT, API_URL } from '../../constants';
import { Field, Form, Input, Textarea } from '../../components';
import { useForm } from '../../hooks';

import styles from '../sign-in-up.pcss';

export const Feedback = withStyles(styles)(() => {
  const requiredFields = ['name', 'massage'];

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    error,
    fields: fieldsValues
  } = useForm({ requiredFields, url: API_URL.FEEDBACK });

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Form
          onSubmit={handleSubmit}
          submitButtonText={APP_TEXT.BTN_SEND}
          title={'Обратная связь'}
        >
          <Field
            label={'Имя'}
            error={error['name']}
          >
            <Input
              name={'name'}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error['name']}
              value={fieldsValues['name'] || ''}
            />
          </Field>
          <Field
            label={'Сообщение'}
            error={error['massage']}
          >
            <Textarea
              name={'massage'}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error['massage']}
              value={fieldsValues['massage'] || ''}
            />
          </Field>
        </Form>
      </div>
    </div>
  );
});
