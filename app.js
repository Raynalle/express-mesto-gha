/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

const cards = require('./routes/cards');
const users = require('./routes/users');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '655204cfca32a7ff31a8e448',
  };
  next();
});

app.use('/', router);
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/users', users);
app.use('/cards', cards);

app.use((req, res) => {
  res.status(404).send({ message: 'Cтраница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
