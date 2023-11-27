/* eslint-disable object-curly-newline */
const routerCard = require('express').Router();
const { createCard, getCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { validateCardCreate, validateCardId } = require('../middlewares/validators');

routerCard.get('/', getCard);
routerCard.post('/', validateCardCreate, createCard);
routerCard.delete('/:cardId', validateCardId, deleteCard);
routerCard.put('/:cardId/likes', validateCardId, likeCard);
routerCard.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = routerCard;
