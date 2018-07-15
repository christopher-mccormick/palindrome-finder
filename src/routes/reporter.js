import express from 'express';
import palindromCheck from '../palindrome/check';

const router = express.Router();

router.get('/',
  async (req, res) => {
    const { input } = req.query;
    const nonAlphanumeric = /[^0-9a-z]/i;
    if (input && !nonAlphanumeric.test(input)) {
      const response = await palindromCheck(input);
      res.json(response);
    } else {
      res.status(400).json('No Valid Test String Supplied');
    }
  });

export default router;
