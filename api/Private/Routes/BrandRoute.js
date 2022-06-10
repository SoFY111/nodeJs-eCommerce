import express from 'express';

import BrandController from '../Controllers/BrandController';

import CheckPermission from '../middlewares/checkPermission';

const app = express();

app.post('/', CheckPermission.checkPermission('create_product'), BrandController.createBrand);
app.get('/', CheckPermission.checkPermission('create_product'), BrandController.getBrands);
app.put('/delete/:id', CheckPermission.checkPermission('create_product'), BrandController.deleteBrand);
app.put('/:id', CheckPermission.checkPermission('create_product'), BrandController.updateBrand);

app.get('/health', BrandController.health);

module.exports = app;