import { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { TForum, TComment, Fields } from './types';
import { useHttp } from 'hooks/useHttp';
import { forumApi } from 'api';

const defaultComments = [
  { id: 1, idForum: 1, comment: 'Комментарий1' },
  { id: 2, idForum: 1, comment: 'Комментарий2' },
  { id: 3, idForum: 2, comment: 'Комментарий34' },
  { id: 4, idForum: 2, comment: 'Комментарий31' },
  { id: 5, idForum: 1, comment: 'Комментарий30' },
  { id: 6, idForum: 2, comment: 'Комментарий33' }
];

export const useForum = (fieldsValue?: Fields) => {
  const [topics, setTopics] = useState<TForum[] | []>([]);
  const [comments, setComments] = useState<TComment[]>(defaultComments);
  const [currentComments, setCurrentComments] = useState<TComment[]>([]);
  const { id } = useParams<{[index: string]: string}>();
  const { request } = useHttp('/');
  const { getTopics, createTopic } = forumApi(request);
  const history = useHistory();

  const currentTopic = useMemo(() => {
    let forum;

    if (topics) {
      forum = topics.find(element => element.id === +id);
    }

    return forum;
  }, [id, topics]);

  useEffect(() => {
    getTopics()
      .then((res) => {
        setTopics(res);
      });
  }, []);

  useEffect(() => {
    if (id) {
      setCurrentComments(comments.filter(element => element.idForum === +id));
    }
  }, [comments]);

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

    if (fieldsValue && id) {
      setComments(prevState => {
        const newComment = {
          id: prevState.length + 1,
          idForum: +id,
          comment: fieldsValue.comment,
        };

        return prevState.concat(newComment);
      });
    }

  }, [fieldsValue]);

  return {
    topics,
    currentTopic,
    comments,
    currentComments,
    handleSubmitTopic,
    handleSubmitComments
  };
};
