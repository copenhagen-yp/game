import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Options, Fields, Error } from './types';
import { APP_REGULAR, APP_TEXT } from '../constants';

export const useForm = (request: (options: Options)=>Promise<any>, requiredFields: string[], successResult?: string) => {
  const [fields, setFields] = useState<Fields>({});
  const [error, setError] = useState<Error>(requiredFields.reduce((accumulate, nameField)=>({ ...accumulate, [nameField]: { value: false, text: '' } }),{}));
  const history = useHistory();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const countError = Object.values(error).filter(err => err.value === true);
    const validFieldValues = Object.values(fields).filter((field) => !!field);

    if (validFieldValues.length >= Object.keys(error).length && !countError.length) {
      request({ body: JSON.stringify(fields) })
        .then(response => {
          if (response && successResult) {
            history.push(successResult);
          }
        });
    } else {
      const form = e.target.elements;

      for (const key in form) {
        if (Object.prototype.hasOwnProperty.call(form, key)) {
          const element = form[key];

          if (element.name && !element.value) {
            setError((prevProps: any) => ({ ...prevProps, [element.name]: { value: true, text: '' } }));
          }
        }
      }
    }
  },[fields]);

  const handleChange = useCallback((e) => {
    if (error[e.target.name]) {
      setError((prevProps: any) => ({ ...prevProps, [e.target.name]: { value: false, text: '' } }));
    }

    if (e.target.name === 'email' && !(APP_REGULAR.VALID_EMAIL.test(e.target.value))) {
      setError((prevProps: any) => ({ ...prevProps, [e.target.name]: { value: true, text: APP_TEXT.ERROR_EMAIL } }));
    }

    setFields((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
  },[error]);

  const handleBlur = useCallback((e) => {
    if (!e.target.value && e.target.name in error) {
      setError((prevProps: any) => ({ ...prevProps, [e.target.name]: { value: true, text: '' } }));
    } else {
      setError((prevProps: any) => ({ ...prevProps, [e.target.name]: { value: false, text: '' } }));
    }
  },[]);

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    fields,
    error,
    setFields
  };
};
