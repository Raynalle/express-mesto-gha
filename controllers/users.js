/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const Unauthorized = require('../errors/Unauthorized');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Ошибка валидации'));
      } else if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

const updateUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные.'));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        {
          expiresIn: '7d',
        },
      );

      res.send({ token });
    })
    .catch((err) => {
      res.status(Unauthorized).send({ message: err.message });
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    if (!user) {
      throw new NotFound('Пользователь не найден');
    }
    return res.status(200).send(user);
  })
    .catch(next);
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(NotFound).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: `Некорректные данные  ${err.message}` });
      } else {
        res.status(500).send({ message: `Ошибка сервера ${err.message}` });
      }
    });
};

module.exports = {
  getUsers, getUserId, createUser, updateUserData, updateAvatar, login, getCurrentUser,
};
