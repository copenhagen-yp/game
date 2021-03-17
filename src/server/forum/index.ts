import { Request, Response } from 'express';

import { Topic, Author, Message } from './models';

// Создаёт новый топик
const createTopic = async (req: Request, res: Response) => {
  if (!req.body.title) {
    res.statusCode = 400;
    res.send('The title field is required');

    return;
  }

  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    id: req.body.userId
  };

  const topic = {
    title: req.body.title,
  };

  try {
    const topicData = await Topic.create(topic);
    let authorData = await Author.findByPk(req.body.userId);

    if (!authorData) {
      authorData = await Author.create(author);
    }

    const topicWithAuthor = await topicData.setAuthor(authorData);

    res.json({
      topic: topicWithAuthor,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      link: `/forum/${topicWithAuthor.id}`,
    });
  } catch (err) {
    res.status(500).send(err.message || 'Some error occurred while creating topic.');
  }
};

// Отдаёт все топики
const getTopics = async (req: Request, res: Response) => {
  try {
    const topicData = await Topic.findAll({
      include: [{
        model: Author,
        attributes: ['firstName', 'lastName'],
      }]
    });

    res.send(topicData);
  } catch (err) {
    res.status(500).send(err.message || 'Some error occurred while retrieving topics.');
  }
};

// Берёт конкретный топик
const getTopic = async (req: Request, res: Response) => {
  const topicId = req.params.id;

  try {
    const topicData = await Topic.findByPk(
      topicId,
      {
        include: [
          {
            model: Author,
            attributes: ['firstName', 'lastName'],
          },
          {
            model: Message,
            include: [{
              model: Author,
              attributes: ['firstName', 'lastName'],
            }]
          },
        ]
      }
    );

    if (topicData) {
      res.send(topicData);
    } else {
      throw new Error('There is no such topic');
    }
  } catch (err) {
    res.status(500).send(err.message || 'Error retrieving Topic with id ' + topicId);
  }
};

// Создаёт сообщение в конкретном топике
const createMessage = async (req: Request, res: Response) => {
  const topicId = req.params.id;

  if (!req.body.message) {
    res.statusCode = 400;
    res.send('The message field is required');

    return;
  }

  const message = {
    message: req.body.message,
  };

  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    id: req.body.userId
  };

  try {
    const messageData = await Message.create(message);
    let authorData = await Author.findByPk(req.body.userId);

    if (!authorData) {
      authorData = await Author.create(author);
    }

    const topicData = await Topic.findByPk(topicId);

    if (topicData) {
      await messageData.setAuthor(authorData);
      await messageData.setTopic(topicData);

      res.send('Ok');
    } else {
      throw new Error('Is not possible to create a message in this topic');
    }
  } catch (err) {
    res.status(500).send(err.message || 'Some error occurred while creating message.');
  }
};

export {
  createTopic,
  getTopics,
  createMessage,
  getTopic,
};
