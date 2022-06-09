require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { success } from 'consola';

import publicRoutes from './Public/index';
import privateRoutes from './Private/index';

const PORT = process.env.PORT;
const app = express();

import { swaggerOptions } from './src/config/swaggerOptions';
const swaggerGenerator = require('express-swagger-generator')(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
	res.send('server is running');
});

app.use('/public', publicRoutes);
app.use('/private', privateRoutes);

swaggerGenerator(swaggerOptions);

app.listen(PORT, () => {
	success({ message: `SERVER IS RUNNING ON ${PORT}`, badge: true });
});