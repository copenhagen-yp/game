import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import cn from 'classnames';

import { useForum, useForm } from '../../hooks';
import { APP_TEXT } from '../../constants';
import { routes } from '../../routes';
import { Field, Input, Form } from '../../components';
import styles from './forum.pcss';
import { userSelectors } from '../../store/user';

export const Forum = withStyles(styles)(() => {
  const requiredFields = ['title'];
  const { handleChange, handleBlur, fields, error, setFields } = useForm({ requiredFields });
  const { topics, handleSubmitTopic } = useForum(fields);
  const user = useSelector(userSelectors.getCurrent);

  useEffect(() => {
    setFields({
      firstName: user?.first_name || '',
      lastName: user?.second_name || '',
      userId: String(user?.id) || '',
    });
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.forum}>
        {
          topics.length ? topics.map((item) => (
            <Link className={styles.forum__item} key={item.id} to={`${routes.topics.path}/${item.id}`}>
              <li className={styles.list}>
                <h3 className={cn(styles.title, styles.ellipsis)}>{item.title}</h3>
                <p className={styles.author}>{item.Author.firstName} {item.Author.lastName}</p>
              </li>
            </Link>
          )) : <p>Нет ни одного топика</p>
        }
      </ul>
      <Form
        onSubmit={handleSubmitTopic}
        wrapperClassName={styles.forum__form}
        title={APP_TEXT.FORUM_TITLE}
        submitButtonText={APP_TEXT.BTN_SEND}
      >
        <Field label="Тема" error={error.title}>
          <Input
            name="title"
            type="text"
            error={error.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Field>
      </Form>
    </div>
  );
});
