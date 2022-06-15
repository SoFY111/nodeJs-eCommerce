import express from 'express';

import OrderController from '../Controllers/OrderController';
import CheckPermission from '../middlewares/checkPermission';

const app = express();

app.get('/', CheckPermission.checkPermission('get_all_orders'), OrderController.getInCompleteOrders);
app.get('/all', CheckPermission.checkPermission('get_all_orders'), OrderController.getAllOrders);
app.get('/completed', CheckPermission.checkPermission('get_all_orders'), OrderController.getCompletedOrders);

app.put('/:orderId', CheckPermission.checkPermission('get_all_orders'), OrderController.completeOrder );
app.delete('/:orderId', CheckPermission.checkPermission('get_all_orders'), OrderController.deleteOrder );

app.get('/health', OrderController.health);

module.exports = app;