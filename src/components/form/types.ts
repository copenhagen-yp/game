import { ChangeEvent, FormEvent, FocusEvent } from 'react';
import { formFieldsType } from '../../pages/profile/types';

export type formProps = {
  wrapperClassName?: string;
  handleSubmit: (e: FormEvent<EventTarget>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<any>) => void;
  error: {
    [key: string]: boolean;
  };
  fields: formFieldsType;
  title: string;
  submitButtonText: string;
  fieldsValues: {
    [key: string]: string;
  };
};
