import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../src/config/envKeys';

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const tokenIsTrue = jwt.verify(token, JWT_SECRET);
		console.log(tokenIsTrue);
		next();
	}
	catch (error) {
		res.json({type: false, message: error.message});
	}
};