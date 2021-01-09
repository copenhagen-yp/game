import React, { FC } from 'react';
import cn from 'classnames';

import { formProps } from './types';
import styles from './form.pcss';
import { Button, Field, Input } from '../../components';

export const Form: FC<formProps> = (props) => {
  const {
    wrapperClassName,
    handleSubmit,
    handleChange,
    handleBlur,
    title,
    error,
    submitButtonText,
    fields,
    fieldsValues,
  } = props;

  return (
    <div className={cn(styles.form__wrapper, wrapperClassName && wrapperClassName)}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form__header}>
          <h3>{title}</h3>
        </div>
        <div className={styles.form__body}>
          {fields.map((field) => (
            <Field
              key={field.name}
              className={styles.form__item}
              label={field.label}
              isError={error[field.name]}
            >
              <Input
                type={field.type}
                name={field.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={error[field.name]}
                value={fieldsValues[field.name] || ''}
              />
            </Field>
          ))}
        </div>
        <div className={styles.form__footer}>
          <Button>{submitButtonText}</Button>
        </div>
      </form>
    </div>
  );
};
