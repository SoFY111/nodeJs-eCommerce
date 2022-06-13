import express from 'express';

import CartController from '../Controllers/CartController';

import CheckPermission from '../middlewares/checkPermission';

const app = express();

app.put('/add-product', CheckPermission.checkPermission('add_product_to_cart'), CartController.addProductToCard);
app.put('/delete-product', CheckPermission.checkPermission('add_product_to_cart'), CartController.deleteProductToCard);
app.get('/get-card', CartController.getUserCard);
app.get('/coniform-card', CartController.coniformCard);

app.get('/health', CartController.health);

module.exports = app;