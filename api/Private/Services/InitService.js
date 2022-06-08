import db from '../../src/models';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../src/config/envKeys';

class InitService{
	
	static async getUserRole(req){
		try {
			const token = req.headers.authorization;
			const tokenData = jwt.verify(token, JWT_SECRET);
			
			const userData = await db.Users.findOne({
				where: {id: tokenData.user_id},
				attributes: [ 'username', 'email', 'name', 'surname' ],
				include: {
					model: db.Roles,
					attributes: [ 'name' ],
					through: { attributes: [] }
				}
			});

			return  {type: true, message: 'successful', data: userData};
		}
		catch (error) {
			return {type: false, message: error.message};
		}
	}

}

export default InitService;