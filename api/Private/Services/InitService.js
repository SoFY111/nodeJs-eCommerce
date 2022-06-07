import db from '../../src/models';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../src/config/envKeys';

class InitService{
	
	static async getUserRole(req){
		try {
			const token = req.headers.authorization;
			const userData = jwt.verify(token, JWT_SECRET);

			//TODO: token'dan gelen kullanıcının rol bilginisi bul
			const userRoles = await db.UserRoles.findAll({where: { user_id: userData.user_id }});
			if (userRoles.length > 0){
				const element = [];
				for (let i = 0;i < userRoles.length;i++) {
					element.push(userRoles[i].role_id);
				}
				console.log('userRole:', element);
			}

			return  {type: true, message: userData};
		}
		catch (error) {
			return {type: false, message: error.message};
		}
	}

}

export default InitService;