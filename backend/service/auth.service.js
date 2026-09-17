import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { readJson, saveJson } from '../io.js';

async function signUp(user) {
  const users = await readJson();
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
  users.push(user);
  await saveJson(users);
}

async function login(userName, password) {
  const users = await readJson();
  const user = users.find((u) => u.userName === userName);

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
