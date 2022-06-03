import db from '../../src/models';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../src/config/envKeys';

class LoginAuthService{

	/* 
	 * md5 -> password //register
	 * jwt -> günlük token //login
	 */

	static async register(body){
		try {

			const password = md5(body.password);

			const isEmailTaken = await db.Users.findOne({where: { email: body.email }});			
			if (isEmailTaken) return {
				type: false,
				message: 'Bu email daha önce kayıt edilmiş.'
			};

			const isUsernameTaken = await db.Users.findOne({where: { username: body.username }});
			if (isUsernameTaken) return {
				type: false,
				message: 'Bu kullanıcı daha önce kayıt edilmiş.'
			};

			const result = await db.Users.create({
				username: body.username,
				email: body.email,
				password,
				name: body.name,
				surname: body.surname,
				isDeleted: 0
			});

			if (result.Length === 0) {
				return {
					type: false,
					message: 'Kullanıcı oluşturulmadı.'
				};
			}

			return {
				type: true,
				message: 'Kullanıcı oluşturuldu.'
			};
		}
		catch (error) {
			throw error;
		}
	}

	static async login(body){
		const user = await db.Users.findOne({where: {email: body.email }});
		if (!user) return {
			type: false,
			message: 'Böyle bir kullanıcı yok.'
		};

		const isPasswordTrue = user.password === md5(body.password) ? true : false;
		if (!isPasswordTrue) return {
			type: false,
			message: 'Şifre yanlış.'
		};
		
		const token = jwt.sign(
			{
				userId: user.id,
				username: user.username,
				email: user.email
			},
			JWT_SECRET,
			{ expiresIn: '24 hours' }
		);

		return {
			type: true,
			message: 'You are now logged in.',
			token
		};

	}

}

export default LoginAuthService;