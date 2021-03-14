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
    authorId: author.id,
  };

  Author.findByPk(req.body.userId)
    .then((data) => {
      if (data) {
        Topic.create(topic)
          .then(() => {
            res.send('Ok');
          })
          .catch(err => [
            res.status(500).send(
              err.message || 'Some error occurred while creating topic.'
            )
          ]);
      } else {
        Author.create(author)
          .then(() => {
            Topic.create(topic)
              .then(() => {
                res.send('Ok');
              });
          })
          .catch(err => [
            res.status(500).send(
              err.message || 'Some error occurred while creating topic.'
            )
          ]);
      }
    })
    .catch(err => [
      res.status(500).send(
        err.message || 'Some error occurred while creating topic.'
      )
    ]);
};

// Отдаёт все топики
const getTopics = (req: Request, res: Response) => {
  Topic.findAll()
    .then(async data => {
      const dataWithAuthors = await data.map((currentTopic) => {
        const result = currentTopic;

        return Author.findByPk(currentTopic.authorId)
          .then((author) => {

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            result.authorFirstName = author?.firstName;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            result.authorLastName = author?.lastName;

            return result;
          });
      });

      console.log(dataWithAuthors);
      res.send(dataWithAuthors);
    })
    .catch(err => {
      res.status(500).send(
        err.message || 'Some error occurred while retrieving topics.'
      );
    });
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
