import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.router';
import postRouter from './routes/post.router';

const app = express();
const PORT: number = 3000;
const __dirname = import.meta.dirname;

app.use(express.json());

app.use(cookieParser());

app.use('/profile', userRouter);

app.use('/post', postRouter);

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, (err?: Error) => {
  if (err) {
    console.log(err);
  }
  console.log(`PORT: ${PORT}`);
});
