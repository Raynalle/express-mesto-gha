const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Ошибка сервера ${err.message}` }));
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Некорректные данные  ${err.message}` });
      } else {
        res.status(500).send({ message: `Ошибка сервера ${err.message}` });
      }
    });
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Неверный запрос ${err.message}` });
      } else {
        res.status(500).send({ message: `Ошибка сервера ${err.message}` });
      }
    });
};

const updateUserData = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Некорректные данные  ${err.message}` });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Некорректные данные  ${err.message}` });
      } else {
        res.status(500).send({ message: `Ошибка сервера ${err.message}` });
      }
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Некорректные данные  ${err.message}` });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Некорректные данные  ${err.message}` });
      } else {
        res.status(500).send({ message: `Ошибка сервера ${err.message}` });
      }
    });
};

module.exports = {
  getUsers, getUserId, createUser, updateUserData, updateAvatar,
};
