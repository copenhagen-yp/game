import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import { APP_TEXT, API_URL } from '../../constants';
import { Field, Form, Textarea } from '../../components';
import { useForm } from '../../hooks';

import styles from '../sign-in-up.pcss';

export const Feedback = withStyles(styles)(() => {
  const requiredFields = ['message'];

  const {
    handleSubmitFeedback,
    handleChange,
    handleBlur,
    error,
    fields: fieldsValues
  } = useForm({ requiredFields, url: API_URL.FEEDBACK }, '/');

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Form
          onSubmit={handleSubmitFeedback}
          submitButtonText={APP_TEXT.BTN_SEND}
          title={'Обратная связь'}
        >
          <Field
            label={'Сообщение'}
            error={error['message']}
          >
            <Textarea
              name={'message'}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error['message']}
              value={fieldsValues['message'] || ''}
            />
          </Field>
        </Form>
      </div>
    </div>
  );
});
