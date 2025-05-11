const express = require('express');
const router = express.Router({mergeParams: true});

const commentsRouter = require('./comments.route');
const postsRouter = require('./posts.route');
const usersRouter = require('./users.route');

router.use('/posts', postsRouter);
router.use('/posts/:post_id/comments', commentsRouter);
router.use('/users', usersRouter);

module.exports = router;