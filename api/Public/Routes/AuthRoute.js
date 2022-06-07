import express from 'express';
import AuthController from '../Controllers/AuthController';

const app = express();

/*
 * / --> register
 * /login --> login
 */

app.post('/', AuthController.register);
app.post('/login', AuthController.login);

app.get('/health', AuthController.health);

module.exports = app;