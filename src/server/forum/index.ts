// Контроллер с предполагаемыми обработчиками
// (будут меняться после создания моделей)

import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import db from './models';

const { Topic, Author, Message } = db;

// Создаёт новый топик
const createTopic = (req: Request, res: Response) => {
  if (!req.body.title) {
    res.statusCode = 400;
    res.send('The title field is required');

    return;
  }

  const topic = {
    title: req.body.title,
    author: req.body.userId,
  };

  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    id: req.body.userId
  };

  Topic.create(topic)
    .then(() => {
      Author.create(author)
        .then(() => {
          res.send('Ok');
        });
    })
    .catch(err => {
      res.status(500).send(
        err.message || 'Some error occurred while creating topic.'
      );
    });
};

// Берёт и отдаёт все топики
const getTopics = (req: Request, res: Response) => {
  // Тут пока хз как авторов брать, будет понятнее когда будут модели
  Topic.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(
        err.message || 'Some error occurred while retrieving topics.'
      );
    });
};

// Берёт конкретный топик
const getTopic = (req: Request, res: Response) => {
  // Пока так же нет получения автора
  const topicId = req.params.id;

  Topic.findByPk(topicId)
    .then(data => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send('Error retrieving Topic with id ' + topicId);
    });
};

// Создаёт сообщение в конкретном топике
const createMessage = (req: Request, res: Response) => {
  if (!req.body.message) {
    res.statusCode = 400;
    res.send('The message field is required');

    return;
  }

  const message = {
    title: req.body.message,
    author: req.body.userId,
    topicId: req.params.id
  };

  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    id: req.body.userId
  };

  Message.create(message)
    .then(() => {
      Author.create(author)
        .then(() => {
          res.send('Ok');
        });
    })
    .catch(err => {
      res.status(500).send(
        err.message || 'Some error occurred while creating message.'
      );
    });
};

// Отдаёт сообщения для конкретного топика
const getMessages = (req: Request, res: Response) => {
  const topicId = req.params.id;

  Message.findAll({ where: topicId })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(
        err.message || 'Some error occurred while retrieving messages.'
      );
    });
};

export {
  createTopic,
  getTopics,
  createMessage,
  getMessages,
  getTopic,
};
