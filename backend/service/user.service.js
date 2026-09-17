import { readJson } from '../io.js';

async function getUserById(id) {
  const users = await readJson();
  const user = users.find((u) => u.id === id);

  if (!user) {
    throw Object.assign(new Error('User not found'), { status: 404 });
  }

  const { password, ...rest } = user;

  return rest;
}

export const userService = {
  getUserById,
};
