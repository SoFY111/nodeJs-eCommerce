import express from 'express';

import OrderController from '../Controllers/OrderController';

import CheckPermission from '../middlewares/checkPermission';

const app = express();

app.get('/create', CheckPermission.checkPermission('create_order'), OrderController.CreateOrder);

app.get('/health', OrderController.health);

module.exports = app;