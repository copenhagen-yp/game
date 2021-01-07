import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Options, Fields, Error } from './types';

export const useForm = (request: (options: Options)=>Promise<any>, requiredFields: string[], successResult: string) => {
  const [fields, setFields] = useState<Fields>({});
  const [error, setError] = useState<Error>(requiredFields.reduce((accumulate, nameField)=>({ ...accumulate, [nameField]: false }),{}));
  const history = useHistory();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (Object.values(fields).length >= Object.keys(error).length) {
      request({ method: 'POST', body: JSON.stringify(fields) })
        .then(response => {
          if (response) {
            history.push(successResult);
          }
        });
    } else {
      const form = e.target.elements;

      for (const key in form) {
        if (Object.prototype.hasOwnProperty.call(form, key)) {
          const element = form[key];

          if (element.name && !element.value) {
            setError((prevProps: any) => ({ ...prevProps, [element.name]: true }));
          }
        }
      }
    }
  },[fields]);

  const handleChange = useCallback((e) => {
    if (error[e.target.name]) {
      setError((prevProps: any) => ({ ...prevProps, [e.target.name]: false }));
    }

    setFields((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
  },[error]);

  const handleBlur = useCallback((e) => {
    if (!e.target.value && e.target.name in error) {
      setError((prevProps: any) => ({ ...prevProps, [e.target.name]: true }));
    } else {
      setError((prevProps: any) => ({ ...prevProps, [e.target.name]: false }));
    }
  },[]);

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    fields,
    error
  };
};
