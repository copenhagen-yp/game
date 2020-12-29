import { useCallback, useState } from 'react';

import { Options } from './types';


// eslint-disable-next-line no-unused-vars
export const useForm = (request: (options: Options)=>void, requiredFields: string[]) => {
  const [fields, setFields] = useState<{[index:string]:string}>({});
  const [error, setError] = useState<{[index:string]:boolean}>(requiredFields.reduce((a,e)=>({ ...a, [e]: false }),{}));
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (Object.values(fields).length >= Object.keys(error).length) {
      request({ method: 'POST', body: JSON.stringify(fields) });
    } else {
      const form = e.target.elements;
      for (const key in form) {
        if (Object.prototype.hasOwnProperty.call(form, key)) {
          const element = form[key];
          if (element.name && !element.value) {
            setError(prevProps => ({ ...prevProps, [element.name]: true }));  
          }
        }
      }
    }
  },[fields]);

  const handleChange = useCallback((e) => {
    if (error[e.target.name]) {
      setError(prevProps => ({ ...prevProps, [e.target.name]: false }));
    }
    setFields(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  },[error]);

  const handleBlur = useCallback((e) => {
    if (!e.target.value && e.target.name in error) {
      setError(prevProps => ({ ...prevProps, [e.target.name]: true }));
    } else {
      setError(prevProps => ({ ...prevProps, [e.target.name]: false }));  
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