import express from 'express';
import fs from 'fs';

//import AuthRoutes from './Routes';

const app = express();

console.log('localhost:5000/pc/');

//__dirname
fs.readdir('./api/Public/Routes', (err, files) => {
	if (err) throw err;
  
	for (let file of files) {
		const routeName = file.slice(0, file.length - 8);
		const routeNameLower = routeName.toLocaleLowerCase();
		
		console.log('***************************');
		console.log('fileName: ', file);
		console.log('routeName:', routeName);
		console.log('routeNameLower:', routeNameLower);
		console.log('***************************'); 

		let routeFile = require(`./Routes/${routeName}Route`);
		app.use(`/${routeNameLower}`, routeFile);
	}
});

module.exports = app;