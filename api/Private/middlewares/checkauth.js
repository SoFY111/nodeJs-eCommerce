import db from '../../src/models';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../src/config/envKeys';

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const tokenData = jwt.verify(token, JWT_SECRET);
			
		const userData = await db.Users.findOne({
			where: {id: tokenData.user_id},
			attributes: [ 'id', 'username', 'email', 'name', 'surname' ],
			include: {
				model: db.Roles,
				attributes: [ 'name' ],
				through: { attributes: [] }
			}
		});

		req.userData = userData;
		next();
	}
	catch (error) {
		console.log(error.message);
		res.json({type: false, message: 'unauthorized'});
	}
};