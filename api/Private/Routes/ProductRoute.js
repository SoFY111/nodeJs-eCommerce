import express from 'express';

import CheckPermission from '../middlewares/checkPermission';

import ProductController from '../Controllers/ProductController';

const app = express();

app.post('/create', CheckPermission.checkPermission('create_product'), ProductController.createProduct);

app.get('/health', ProductController.health);

module.exports = app;