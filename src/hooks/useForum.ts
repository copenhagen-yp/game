import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { TForum, TComment, Fields } from './types';

const defaultForums = [
  { id: 1, name: 'Forum1', description: 'description Forum1' },
  { id: 2, name: 'Forum2', description: 'description Forum2' }
];

const defaultComments = [
  { id: 1, idForum: 1, comment: 'Комментарий1' },
  { id: 2, idForum: 1, comment: 'Комментарий2' },
  { id: 3, idForum: 2, comment: 'Комментарий34' },
  { id: 4, idForum: 2, comment: 'Комментарий31' },
  { id: 5, idForum: 1, comment: 'Комментарий30' },
  { id: 6, idForum: 2, comment: 'Комментарий33' }
];

export const useForum = (fieldsValue?: Fields) => {
  const [forums, setForums] = useState<TForum[]>(defaultForums);
  const [comments, setComments] = useState<TComment[]>(defaultComments);
  const [currentComments, setCurrentComments] = useState<TComment[]>([]);
  const { id } = useParams<{[index: string]: string}>();

  const currentForum = useMemo(() => {
    const forum = forums.find(element => element.id === +id);

    return forum;
  }, [id, forums]);

  useEffect(() => {
    if (id) {
      setCurrentComments(comments.filter(element => element.idForum === +id));
    }
  }, [comments]);

  const handleSubmitQuestion = useCallback((e) => {
    e.preventDefault();
    e.target.reset();

    if (fieldsValue) {
      setForums(prevState => {
        const newForum = {
          id: prevState.length + 1,
          name: fieldsValue.name,
          description: fieldsValue.description,
        };

        return prevState.concat(newForum);
      });
    }
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
    forums,
    currentForum,
    comments,
    currentComments,
    handleSubmitQuestion,
    handleSubmitComments
  };
};
