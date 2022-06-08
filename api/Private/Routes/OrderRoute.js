import express from 'express';
import OrderController from '../Controllers/OrderController';

const app = express();

app.get('/health', OrderController.health);

module.exports = app;