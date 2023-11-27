const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user_id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Некорректные данные  ${err.message}` });
      } else {
        res.status(500).send({ message: `Ошибка на сервере ${err.message}` });
      }
    });
};

const getCard = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Ошибка на сервере ${err.message}` }));
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('карточка с таким id не найдена');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new Forbidden('Вы не можете удалить карточку другого пользователя');
      }
      card.remove();
      res.status(200).send({ data: card, message: 'Карточка удалена' });
    })
    .catch(next);
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Некорректные данные  ${err.message}` });
      } else {
        res.status(500).send({ message: `Ошибка на сервере ${err.message}` });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Некорректные данные  ${err.message}` });
      } else {
        res.status(500).send({ message: `Ошибка на сервере ${err.message}` });
      }
    });
};

module.exports = {
  createCard, getCard, deleteCard, likeCard, dislikeCard,
};
