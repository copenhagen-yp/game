import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { TForum, TComment, Fields } from './types';
import { useHttp } from 'hooks/useHttp';
import { forumApi } from 'api';

// const defaultForums = [
//   { id: 1, name: 'Forum1', description: 'description Forum1' },
//   { id: 2, name: 'Forum2', description: 'description Forum2' }
// ];

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
  const { getTopics } = forumApi(request);

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

  // const handleSubmitTopic = useCallback((e) => {
  //   e.preventDefault();
  //   e.target.reset();
  //
  //   if (fieldsValue) {
  //     setTopics(prevState => {
  //       const newForum = {
  //         id: prevState.length + 1,
  //         name: fieldsValue.name,
  //         description: fieldsValue.description,
  //       };
  //
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-ignore
  //       return prevState.concat(newForum);
  //     });
  //   }
  // }, [fieldsValue]);

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
    // handleSubmitTopic,
    handleSubmitComments
  };
};
