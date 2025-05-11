const commentsService = require('@/services/comments.service');

const response = require('@/utils/response');
const throwError = require('@/utils/throwError');

const show = async (req, res) => {
  const comments = await commentsService.getCommentByPostId(req.params.post_id);
  response.success(res, 200, comments);
};

const index = async (req, res) => {
  const comment = await commentsService.getCommentById(req.params.post_id, req.params.id);

  if (!comment) throwError(404, 'Not Found.');

  response.success(res, 200, comment);
};

const store = async (req, res) => {
  const comment = await commentsService.createComment(req.params.post_id, req.body);

  response.success(res, 201, comment);
};

const update = async (req, res) => {
  const comment = await commentsService.updateComment(req.params.post_id, req.params.id, req.body);

  if (!comment) throwError(404, "Not Found.");

  response.success(res, 201, comment);
};

const destroy = async (req, res) => {
  const result = await commentsService.deleteComment(req.params.post_id, req.params.id);

  if (!result) throwError(404, "Not Found");

  response.success(res, 204);
};

module.exports = { show, index, store, update, destroy };