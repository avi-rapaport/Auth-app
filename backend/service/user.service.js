import { readJson } from '../io.js';

async function getUserByName(userName) {
  const users = await readJson();
  const user = users.find((u) => u.userName === userName);

  if (!user) {
    throw Object.assign(new Error('User not found'), { status: 404 });
  }

  const { password, ...rest } = user;

  return rest;
}

export const userService = {
  getUserByName,
};
