const { readDB, writeDB } = require('@/utils/files.util');
const { getCommentByPostId } = require('./comments.service');
const RESOURCE = 'posts';

const getPosts = async () => {
  const posts = await readDB(RESOURCE);
  return posts;
};

const getPostById = async (id) => {
  const posts = await readDB(RESOURCE);
  const post = posts.find((post) => post.id === +id);
  getCommentByPostId(id);
  return post;
};

const createPost = async ( data) => {
  const posts = await readDB(RESOURCE);
 
  const nextId = (posts.at(-1)?.id ?? 0) + 1;
  const post = {
    ...data,
    id: nextId,
  };

  posts.push(post);

  await writeDB(RESOURCE, posts);
  return posts;
};

const updatePost = async (id, data) => {
  const posts = await readDB(RESOURCE);
  const post = await getPostById(id);
  if (!post) return;
  Object.assign(post, data);

  await writeDB(RESOURCE, posts);
  return post;
};

const deletePost = async (id) => {
  const posts = await readDB(RESOURCE);
  const postIndex = posts.findIndex((post) => post.id === +id);
  if (postIndex === -1) return;
  posts.splice(postIndex, 1);
  await writeDB(RESOURCE, posts);

  return true;
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};