import express from 'express';
import { userService } from '../service/user.service.js';
import { authMiddleware } from '../middleware/middleware.js';

export const router = express.Router();

router.get('/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.getUserById(id);
  res.json(user);
});
