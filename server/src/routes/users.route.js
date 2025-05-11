const express = require('express');
const usersController = require('@/controllers/users.controller');

const router = express.Router();

router.get('/', usersController.getUsers);
// router.get('/:id', usersController.index);
// router.user('/', usersController.store);
// router.put('/:id', usersController.update);
// router.patch('/:id', usersController.update);
// router.delete('/:id', usersController.destroy);

module.exports = router;