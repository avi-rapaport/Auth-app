import express from 'express';
import { userService } from '../service/user.service.js';
import { authMiddleware } from '../middleware/middleware.js';

export const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
  const { userName } = req.user;
  console.log(userName);
  const user = await userService.getUserByName(userName);
  console.log(user);
  res.json(user);
});
