const express = require('express');
const postsController = require('@/controllers/posts.controller');

const {
  createPostValidator,
  updatePostValidator,
} = require('@/validator/posts.validator');

const router = express.Router();

router.get('/', postsController.show);
router.get('/:id', postsController.index);
router.post('/', createPostValidator, postsController.store);
router.put('/:id', updatePostValidator, postsController.update);
router.patch('/:id', updatePostValidator, postsController.update);
router.delete('/:id', postsController.destroy);

module.exports = router;