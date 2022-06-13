import express from 'express';

import CartController from '../Controllers/CartController';

import CheckPermission from '../middlewares/checkPermission';

const app = express();

app.put('/add-product', CheckPermission.checkPermission('add_product_to_cart'), CartController.addProductToCart);
app.put('/delete-product', CheckPermission.checkPermission('add_product_to_cart'), CartController.deleteProductToCart);
app.get('/get-cart', CartController.getUserCart);
app.get('/confirm-cart', CartController.confirmCart);

app.get('/health', CartController.health);

module.exports = app;