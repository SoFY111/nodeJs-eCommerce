import express from 'express';
import fs from 'fs';

import checkAuth from './middlewares/checkauth';

const app = express();

fs.readdir('./api/Private/Routes', (err, files) => {
	if (err) throw err;
  
	for (let file of files) {
		const routeName = file.slice(0, file.length - 8);
		const routeNameLower = routeName.toLowerCase();

		let routeFile = require(`./Routes/${routeName}Route`);
		app.use(`/${routeNameLower}`, routeFile);
	}
});

module.exports = app;