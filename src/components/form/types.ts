import { FormEvent, ReactNode } from 'react';

export type formProps = {
  wrapperClassName?: string;
  formClassName?: string;
  handleSubmit: (e: FormEvent<EventTarget>) => void;
  title: string;
  submitButtonText: string;
  children?: ReactNode;
};
