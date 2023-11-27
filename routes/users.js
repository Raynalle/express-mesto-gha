const routerUsers = require('express').Router();

const {
  getUsers, getUserId, updateUserData, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const {
  validateUserId, validateUpdateUserData, validateAvatarUpdate,
} = require('../middlewares/validators');

routerUsers.get('/', getUsers);
routerUsers.get('/me', getCurrentUser);
routerUsers.get('/:userId', validateUserId, getUserId);
routerUsers.patch('/me', validateUpdateUserData, updateUserData);
routerUsers.patch('/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = routerUsers;
