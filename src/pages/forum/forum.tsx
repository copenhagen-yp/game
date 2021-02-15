import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useForum, useForm } from '../../hooks';
import { APP_TEXT } from '../../constants';
import { routes } from '../../routes';
import { Field, Input, Form } from '../../components';
import styles from './forum.pcss';

export const Forum = withStyles(styles)(() => {
  const requiredFields = ['question_name', 'question_description'];
  const { handleChange, handleBlur, fields, error } = useForm({ requiredFields });
  const { forums, handleSubmitQuestion } = useForum(fields);

  return (
    <div className={styles.container}>
      <ul className={styles.forum}>
        {
          forums.map(item => {
            return (
              <Link key={item.id} to={`${routes.forums.path}/${item.id}`}>
                <li className={styles.forum__item}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </li>
              </Link>
            );
          })
        }
      </ul>
      <Form
        onSubmit={handleSubmitQuestion}
        wrapperClassName={styles.forum__form}
        title={APP_TEXT.FORUM_TITLE}
        submitButtonText={APP_TEXT.BTN_SEND}
      >
        <Field label="Тема" error={error.name}>
          <Input
            name="name"
            type="text"
            error={error.name}
            onChange={handleChange}
            onBlur={handleBlur} />
        </Field>
        <Field label="Описание" error={error.description}>
          <Input
            name="description"
            type="text"
            error={error.description}
            onChange={handleChange}
            onBlur={handleBlur} />
        </Field>
      </Form>
    </div>
  );
});
