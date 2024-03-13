import express from 'express';
import path from 'path';

const app = express();
const PORT: number = 3000;
const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(express.json());

app.listen(PORT, (err?: Error) => {
  if (err) {
    console.log(err);
  }
  console.log(`PORT: ${PORT}`);
});
