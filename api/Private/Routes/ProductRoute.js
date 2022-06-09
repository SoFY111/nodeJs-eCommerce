import express from 'express';

import CheckPermission from '../middlewares/checkPermission';

import ProductController from '../Controllers/ProductController';

const app = express();

app.post('/', CheckPermission.checkPermission('create_product'), ProductController.createProduct);
app.delete('/delete/:id', CheckPermission.checkPermission('delete_product'), ProductController.deleteProduct);
app.get('/list', ProductController.getProducts);

app.get('/health', ProductController.health);

module.exports = app;