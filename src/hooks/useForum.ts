import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { TForum, TComment, Fields } from './types';
import { useHttp } from 'hooks/useHttp';
import { forumApi } from 'api';

export const useForum = (fieldsValue?: Fields) => {
  const [topics, setTopics] = useState<TForum[] | []>([]);
  const [currentComments, setCurrentComments] = useState<TComment[]>([]);
  const [currentTopic, setCurrentTopic] = useState('');
  const [messagesNeedUpdate, setMessagesNeedUdate] = useState([]);
  const { id } = useParams<{[index: string]: string}>();
  const { request } = useHttp('/');
  const { getTopics, createTopic, getTopic, createMessage } = forumApi(request);
  const history = useHistory();

  useEffect(() => {
    if (!id) {
      getTopics()
        .then(res => {
          setTopics(res);
        });
    }
  }, []);

  useEffect(() => {
    if (id) {
      getTopic(id)
        .then(res => {
          if (res) {
            setCurrentComments(res.Messages);
            setCurrentTopic(res.title);
          }
        });
    }
  }, [messagesNeedUpdate]);

  const handleSubmitTopic = useCallback((e) => {
    e.preventDefault();
    e.target.reset();

    createTopic(fieldsValue)
      .then(res => {
        if (res && res.link) {
          history.push(res.link);
        }
      });
  }, [fieldsValue]);

  const handleSubmitComments = useCallback((e) => {
    e.preventDefault();
    e.target.reset();

    createMessage(id, fieldsValue)
      .then(() => {
        setMessagesNeedUdate([]);
      });
  }, [fieldsValue]);

  return {
    topics,
    currentTopic,
    currentComments,
    handleSubmitTopic,
    handleSubmitComments,
  };
};
