require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import { success } from 'consola';

import readPublicRoutes from './Public/index';

const PORT = process.env.PORT;
const app = express();

import { swaggerOpitons } from './src/config/swaggerOptions';
const swaggerGenerator = require('express-swagger-generator')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
	res.send('server is running');
});

app.use('/public', readPublicRoutes);

swaggerGenerator(swaggerOpitons);

app.listen(PORT, () => {
	success({ message: `SERVER IS RUNNING ON ${PORT}`, badge: true });
});