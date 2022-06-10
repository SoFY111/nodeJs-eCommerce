import express from 'express';

import CardController from '../Controllers/CardController';

import CheckPermission from '../middlewares/checkPermission';

const app = express();

app.put('/add-product', CheckPermission.checkPermission('add_product_to_card'), CardController.addProductToCard);
app.get('/get-card', CardController.getUserCard);

app.get('/health', CardController.health);

module.exports = app;