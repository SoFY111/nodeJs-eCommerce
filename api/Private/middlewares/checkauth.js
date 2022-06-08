import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../src/config/envKeys';

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const tokenIsTrue = jwt.verify(token, JWT_SECRET);
		req.userData = tokenIsTrue;
		next();
	}
	catch (error) {
		res.json({type: false, message: 'unauthorized'});
	}
};