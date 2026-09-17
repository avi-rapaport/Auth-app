import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router as authRouter } from './routes/auth.routes.js';
import { router as userRouter } from './routes/user.routes.js';
import { errorHandler } from './middleware/middleware.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use('/', authRouter);
app.use('/users', userRouter);

app.use((req, res) => {
  res.status(404).json(`${req.url} don't have ${req.method} method!`);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
