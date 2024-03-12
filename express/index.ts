import express from 'express';

const app = express();
const PORT: number = 3000;

app.use(express.json());

app.listen(PORT, (err?: Error) => {
  if (err) {
    console.log(err);
  }
  console.log(`PORT: ${PORT}`);
});
