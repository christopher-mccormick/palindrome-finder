import express from 'express';
import path from 'path';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import * as routes from './routes';

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());
app.use(bodyParser.json({ limit: '1mb' }));
app.get('/', (req, res) => res.status(200).send('parlindrome-finder v1.0.0'));
app.use('/reporter', routes.reporter);
app.use('/search', routes.search);
app.use((req, res, next) => {
  const err = new Error(`Not Found: ${JSON.stringify(req.originalUrl)}`);
  err.status = 404;
  next(err);
});

module.exports = app;
