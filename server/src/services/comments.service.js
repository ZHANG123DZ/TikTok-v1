const { readDB, writeDB } = require('@/utils/files.util');
const RESOURCE = 'comments';

const getComments = async (post_id) => {
  const comments = await readDB(RESOURCE);
  const commentsList = comments.find((comment) => comment.post_id === +post_id)
  return commentsList;
};

const getCommentById = async (post_id, id) => {
  const comments = await readDB(RESOURCE);
  const comment = comments.find((comment) => comment.id === +id && comment.post_id === +post_id);

  return comment;
};

const createComment = async (post_id, data) => {
  const comments = await readDB(RESOURCE);
  
  const nextId = (comments.at(-1)?.id ?? 0) + 1;
  const comment = {
    ...data,
    post_id: Number(post_id),
    id: nextId,
  };

  comments.push(comment);

  await writeDB(RESOURCE, comments);
  return comments;
};
const updateComment = async (post_id, id, data) => {
  const comments = await readDB(RESOURCE);
  const comment = comments.find((comment) => comment.id === +id && comment.post_id === +post_id);
  if (!comment) return;
  Object.assign(comment, data);

  await writeDB(RESOURCE, comments);
  return comment;
};

const deleteComment = async (post_id, id) => {
  const comments = await readDB(RESOURCE);
  const commentIndex = comments.findIndex((comment) => comment.id === +id && comment.post_id === +post_id);
  if (commentIndex === -1) return;
  comments.splice(commentIndex, 1);
  await writeDB(RESOURCE, comments);

  return true;
};

const getCommentByPostId = async (post_id) => {
  const comments = await readDB(RESOURCE);
  const commentsList = comments.filter((comment) => comment.post_id === +post_id);

  return commentsList;
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentByPostId,
};