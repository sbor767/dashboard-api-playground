import express from 'express';

const port = 8000;
const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
