import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { readJson, saveJson } from '../io.js';

async function signUp(userData) {
  const users = await readJson();
  const userNameExists = users.find((u) => u.userName === userData.userName);
  if (userNameExists) {
    throw Object.assign(new Error('Username already taken!'), { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const id = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  userData.password = hashedPassword;
  const userToSave = { id, ...userData };
  users.push(userToSave);
  await saveJson(users);
  return id;
}

async function login(userName, password) {
  const users = await readJson();
  const user = users.find((u) => u.userName === userName);

  if (!user) {
    throw Object.assign(new Error('User not found'), { status: 404 });
  }

  const isAuthenticated = bcrypt.compare(password, user.password);
  if (!isAuthenticated) {
    throw Object.assign(new Error('Incorrect password'), { status: 401 });
  }

  const token = jwt.sign({ userName }, process.env.JWT_SECRET, {
    expiresIn: '55m',
  });

  return token;
}

export const authService = { signUp, login };
