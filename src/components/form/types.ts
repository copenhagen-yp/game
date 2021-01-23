import { FormEvent, ReactNode } from 'react';

export type formProps = {
  wrapperClassName?: string;
  formClassName?: string;
  onSubmit: (e: FormEvent<EventTarget>) => void;
  title: string;
  submitButtonText: string;
  children?: ReactNode;
};
