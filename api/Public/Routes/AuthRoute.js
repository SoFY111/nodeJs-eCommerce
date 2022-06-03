import express from 'express';
import AuthController from '../Controllers/AuthController';

const app = express();

/*
 * / --> register
 * /login --> login
 */

app.get('/', AuthController.home);
app.post('/users', AuthController.register);
app.post('/users/login', AuthController.login);

module.exports = app;