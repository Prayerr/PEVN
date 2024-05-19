import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import logger from './utils/common/logger';
import userRouter from './routes/user.router';
import postRouter from './routes/post.router';

const app = express();
const PORT: number = 3000;

app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
  logger.info(`HTTP: ${req.method} ${req.url}`);
  next();
});

app.use('/profile', userRouter);

app.use('/post', postRouter);

app.use(express.static(path.resolve(import.meta.dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(import.meta.dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, (error?: Error) => {
  if (error) {
    logger.error('Возникла ошибка', error);
  }
  logger.info(`PORT: ${PORT}`);
});
