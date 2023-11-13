const routerUsers = require('express').Router();

const {
  getUsers, getUserId, createUser, updateUserData, updateAvatar,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/:userId', getUserId);
routerUsers.post('/', createUser);
routerUsers.patch('/me', updateUserData);
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
