import React from 'react';

import { useForum, useHttp, useForm } from '../../hooks';
import { Input, Button, Field } from '../../components';
import { APP_TEXT, REQUEST_METHOD } from '../../constants';
import styles from './forum.pcss';

export const Topic = () => {
  const requiredFields = ['comment'];
  const { request } = useHttp('', REQUEST_METHOD.POST);
  const { handleChange, handleBlur, fields, error } = useForm(request, requiredFields);
  const { currentForum, currentComments, handleSubmitComments } = useForum(fields);

  return (
    <div className={styles.container}>
      <h3>{currentForum?.name}</h3>
      <p>{currentForum?.description}</p>
      <ul>
        {currentComments.map(item => {
          return (
            <li key={item.id} className={styles.comments}>{item.comment}</li>
          )
        })}
      </ul>
      <form onSubmit={handleSubmitComments} className={styles.forum__form}>
        <h3>{APP_TEXT.COMMENT_TITLE}</h3>
        <Field label="Комментарий" error={error.comment}>
          <Input
            name="comment"
            type="text"
            error={error.comment}
            onChange={handleChange}
            onBlur={handleBlur} />
        </Field>
        <Button>{APP_TEXT.BTN_SEND}</Button>
      </form>
    </div>
  )
};
