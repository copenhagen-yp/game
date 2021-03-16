import { Request, Response } from 'express';

import { Topic, Author/*, Message*/ } from './models';

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const finalData = await topicData.setAuthor(authorData);

    res.json({
      topic: finalData,
      link: `/forum/${finalData.id}`,
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
// const getTopic = (req: Request, res: Response) => {
//   const topicId = req.params.id;
//
//   Topic.findByPk(topicId)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(() => {
//       res.status(500).send('Error retrieving Topic with id ' + topicId);
//     });
// };
//
// // Создаёт сообщение в конкретном топике
// const createMessage = (req: Request, res: Response) => {
//   if (!req.body.message) {
//     res.statusCode = 400;
//     res.send('The message field is required');
//
//     return;
//   }
//
//   const message = {
//     title: req.body.message,
//     author: req.body.userId,
//     topicId: req.params.id
//   };
//
//   const author = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     id: req.body.userId
//   };
//
//   Message.create(message)
//     .then(() => {
//       Author.create(author)
//         .then(() => {
//           res.send('Ok');
//         });
//     })
//     .catch(err => {
//       res.status(500).send(
//         err.message || 'Some error occurred while creating message.'
//       );
//     });
// };

// Отдаёт сообщения для конкретного топика
// const getMessages = (req: Request, res: Response) => {
//   const topicId = req.params.id;
//
//   Message.findAll({ where: topicId })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send(
//         err.message || 'Some error occurred while retrieving messages.'
//       );
//     });
// };

export {
  createTopic,
  getTopics,
  // createMessage,
  // getMessages,
  // getTopic,
};
