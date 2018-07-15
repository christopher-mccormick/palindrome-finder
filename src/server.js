const app = require('./app');

const port = process.env.PORT || 3010;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`palindrome-finder app listening on port ${port}`);
});
