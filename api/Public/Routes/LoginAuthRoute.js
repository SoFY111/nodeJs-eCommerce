import express from 'express';
import LoginAuthController from '../Controllers/LoginAuthController';

const app = express();

app.post('/users', LoginAuthController.register);
app.post('/users/login', LoginAuthController.login);

module.exports = app;