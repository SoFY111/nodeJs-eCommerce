import express from 'express';

import BrandController from '../Controllers/BrandController';

import CheckPermission from '../middlewares/checkPermission';

const app = express();

app.post('/', CheckPermission.checkPermission('create_brand'), BrandController.createBrand);
app.get('/', BrandController.getBrands);
app.put('/delete/:id', CheckPermission.checkPermission('delete_brand'), BrandController.deleteBrand);
app.put('/:id', CheckPermission.checkPermission('update_brand'), BrandController.updateBrand);

app.get('/health', BrandController.health);

module.exports = app;