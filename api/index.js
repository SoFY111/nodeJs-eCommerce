require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import { success } from 'consola';

import publicAuthRoutes from './Public/Routes/LoginAuthRoute';

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
	res.send('server is running');
});

app.use('/public/', publicAuthRoutes);

app.listen(PORT, () => {
	success({ message: `SERVER IS RUNNING ON ${PORT}`, badge: true });
});