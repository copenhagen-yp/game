import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());

router.post('/feedback', (req, res) => {
  console.log(req.body);

  res.json({
    message: 'some answer'
  });
});

export default router;
