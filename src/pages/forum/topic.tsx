import React, { useEffect } from 'react';
import cn from 'classnames';

import { useForum, useForm } from '../../hooks';
import { Button, Field, Textarea } from '../../components';
import { APP_TEXT } from '../../constants';
import styles from './forum.pcss';
import withStyles from 'isomorphic-style-loader/withStyles';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../store/user';

export const Topic = withStyles(styles)(() => {
  const requiredFields = ['comment'];
  const { handleChange, handleBlur, fields, error, setFields } = useForm({ requiredFields });
  const { currentTopic, currentComments, handleSubmitComments } = useForum(fields);
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
      <h3 className={styles.currentTopicTitle}>{currentTopic}</h3>
      <ul>
        {currentComments.map(item => {
          return (
            <li key={item.id} className={styles.list}>
              <p className={cn(styles.title, styles.ellipsis)}>{item.message}</p>
              <p className={cn(styles.messageAuthor, styles.ellipsis)}>{item.author.firstName} {item.author.lastName}</p>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSubmitComments} className={styles.forum__form}>
        <h3>{APP_TEXT.COMMENT_TITLE}</h3>
        <Field label="Комментарий" error={error.message}>
          <Textarea
            name="message"
            onChange={handleChange}
            onBlur={handleBlur}
            error={error.message}
          />
        </Field>
        <Button className={styles.topicButton}>{APP_TEXT.BTN_SEND}</Button>
      </form>
    </div>
  );
});
