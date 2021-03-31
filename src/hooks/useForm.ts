import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { Fields, Error, UseFormProps } from './types';
import { useHttp } from './useHttp';
import * as userActions from '../store/user/actions';
import { userSelectors } from '../store/user';
import { APP_REGULAR, APP_TEXT, REQUEST_METHOD } from '../constants';
import { API_URL } from './../constants';


export const useForm = ({ requiredFields, successResult, url, method }: UseFormProps, domain?: string) => {
  const { request } = useHttp(domain);
  const { addToast } = useToasts();
  const [fields, setFields] = useState<Fields>({});
  const [error, setError] = useState<Error>(requiredFields.reduce((accumulate, nameField)=>({ ...accumulate, [nameField]: { value: false, text: '' } }),{}));
  const user = useSelector(userSelectors.getCurrent);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmitSign = useCallback((e) => {
    e.preventDefault();
    const countError = Object.values(error).filter(err => err.value === true);
    const validFieldValues = Object.values(fields).filter((field) => !!field);

    if (validFieldValues.length >= Object.keys(error).length && !countError.length && url) {
      request(url, { body: JSON.stringify(fields), method: method || REQUEST_METHOD.POST })
        .then(response => {
          if (response && successResult) {

            dispatch(userActions.setSuccessStatus());

            request(API_URL.GET_USER_INFO)
              .then((resp) => {
                dispatch(userActions.setUserInfo(resp));
              });
            history.push(successResult);
          }
        })
        .catch(() => dispatch(userActions.setFailedStatus()));

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

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const countError = Object.values(error).filter(err => err.value === true);
    const validFieldValues = Object.values(fields).filter((field) => !!field);

    if (validFieldValues.length >= Object.keys(error).length && !countError.length && url) {

      request(url, { body: JSON.stringify(fields), method: method || REQUEST_METHOD.POST })
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

  const handleSubmitFeedback = useCallback((e) => {
    e.preventDefault();
    const countError = Object.values(error).filter(err => err.value === true);
    const validFieldValues = Object.values(fields).filter((field) => !!field);

    if (validFieldValues.length >= Object.keys(error).length && !countError.length && url) {

      request(url, { body: JSON.stringify({ ...fields, userId: user?.id }), method: method || REQUEST_METHOD.POST })
        .then(() => {
          addToast('Спасибо за обратную связь', { appearance: 'success' });
          setFields(prevState =>
            Object.keys(prevState).reduce((accum, key) => ({ ...accum, [key]: '' }), {})
          );
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
    handleSubmitSign,
    handleChange,
    handleBlur,
    fields,
    error,
    setFields,
    handleSubmitFeedback,
  };
};
