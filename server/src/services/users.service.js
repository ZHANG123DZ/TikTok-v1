const { readDB, writeDB } = require('@/utils/files.util');
const { getCommentByUserId } = require('./comments.service');
const RESOURCE = 'users';

const getUsers = async () => {
  const users = await readDB(RESOURCE);
  return users;
};

const getUserById = async (id) => {
  const users = await readDB(RESOURCE);
  const user = users.find((user) => user.id === +id);
  getCommentByUserId(id);
  return user;
};

const createUser = async (data) => {
  const users = await readDB(RESOURCE);
  const nextId = (users.at(-1)?.id ?? 0) + 1;
  const user = {
    ...data,
    id: nextId,
  };

  users.push(user);

  await writeDB(RESOURCE, users);
  return users;
};

const updateUser = async (id, data) => {
  const users = await readDB(RESOURCE);
  const user = await getUserById(id);
  if (!user) return;
  Object.assign(user, data);

  await writeDB(RESOURCE, users);
  return user;
};

const deleteUser = async (id) => {
  const users = await readDB(RESOURCE);
  const userIndex = users.findIndex((user) => user.id === +id);
  if (userIndex === -1) return;
  users.splice(userIndex, 1);
  await writeDB(RESOURCE, users);

  return true;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};