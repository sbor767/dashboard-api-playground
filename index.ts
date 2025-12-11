import express from 'express';
import { router as userRouter } from './users/users.js';

const port = 8000;
const app = express();

app.get('/hello', (req, res) => {
	res.send('Hello, World!');
});

app.use('/users', userRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
