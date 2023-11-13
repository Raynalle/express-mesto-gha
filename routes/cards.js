const routerCard = require('express').Router();

const {
  createCard, getCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCard.get('/', getCard);
routerCard.post('/', createCard);
routerCard.delete('/:cardId', deleteCard);
routerCard.put('/cardId/likes', likeCard);
routerCard.delete('/cardId/likes', dislikeCard);

module.exports = routerCard;
