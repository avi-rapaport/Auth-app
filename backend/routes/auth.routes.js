import express from 'express';
import { authService } from '../service/auth.service.js';

export const router = express.Router();

router.post('/signup', async (req, res) => {
  const userData = req.body;
  const newId = await authService.signUp(userData);
  res.status(201).json({ message: 'User signup!', newId });
});

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const token = await authService.login(userName, password);
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
  });
  res.json({ message: 'User logged in!' });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'User logged out!' });
});
