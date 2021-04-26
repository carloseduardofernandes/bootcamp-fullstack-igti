import express from 'express';

const app = express();

app.get('/', (req, rest) => {
  rest.send('Hello Word GET');
});

app.post('/', (req, res) => {
  res.send('Hello World! POST');
});

app.listen(3000, () => {
  console.log('Api started!');
});
