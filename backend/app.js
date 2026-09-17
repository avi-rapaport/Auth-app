import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
