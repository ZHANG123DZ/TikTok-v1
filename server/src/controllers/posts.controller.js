const postsService = require('@/services/posts.service');

const response = require('@/utils/response');
const throwError = require('@/utils/throwError');

const show = async (req, res) => {
  const posts = await postsService.getPosts();
  response.success(res, 200, posts);
};

const index = async (req, res) => {
  const post = await postsService.getPostById(req.params.id);

  if (!post) throwError(404, 'Not Found.');

  response.success(res, 200, post);
};

const store = async (req, res) => {
  const post = await postsService.createPost(req.body);

  response.success(res, 201, post);
};

const update = async (req, res) => {
  const post = await postsService.updatePost(req.params.id, req.body);

  if (!post) throwError(404, "Not Found.");

  response.success(res, 201, post);
};

const destroy = async (req, res) => {
  const result = await postsService.deletePost(req.params.id);

  if (!result) throwError(404, "Not Found.");

  response.success(res, 204);
};

module.exports = { show, index, store, update, destroy };