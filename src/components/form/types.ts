import { ChangeEvent, FormEvent, FocusEvent } from 'react';

export type formProps = {
  handleSubmit: (e: FormEvent<EventTarget>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<any>) => void;
  error: {
    [key: string]: boolean;
  };
  fields: {
    [key: string]: string;
  }[];
  title: string;
  submitButtonText: string;
};
