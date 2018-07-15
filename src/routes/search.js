import express from 'express';
import palindromCheck from '../palindrome/check';

const router = express.Router();
const getResults = (response, callback) => {
  let html = '';
  if (response) {
    const { palindromes } = response;
    const palindromesLength = palindromes.length;
    if (response.additionalInformation) {
      html += (`<div>${response.additionalInformation}<div>`);
    }
    for (let i = 0; i < palindromesLength; i += 1) {
      html += (`<div>${palindromes[i]}</div>`);
    }
  }
  callback(html);
};

router.get('/', (req, res) => {
  getResults(null, (callback) => {
    res.render('find', { callback });
  });
});

router.get('/results',
  async (req, res) => {
    const { input } = req.query;
    const nonAlphanumeric = /[^0-9a-z]/i;
    if (input && !nonAlphanumeric.test(input)) {
      const response = await palindromCheck(input);
      getResults(response, (callback) => {
        res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
        res.end(callback);
      });
    } else {
      res.status(400).json('No Valid Test String Supplied');
    }
  });

export default router;
