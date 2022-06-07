import db from '../../src/models';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../src/config/envKeys';

class AuthService{

	static async register(body){
		try {

			const password = md5(body.password);

			const isEmailTaken = await db.Users.findOne({where: { email: body.email }});			
			if (isEmailTaken) return {
				type: false,
				message: 'Email is already taken.'
			};

			const isUsernameTaken = await db.Users.findOne({where: { username: body.username }});
			if (isUsernameTaken) return {
				type: false,
				message: 'Username is already taken'
			};

			const result = await db.Users.create({
				username: body.username,
				email: body.email,
				password,
				name: body.name,
				surname: body.surname,
				isDeleted: 0
			});

			if (!result) {
				return {
					type: false,
					message: 'user not created'
				};
			}

			return {
				type: true,
				message: 'User created'
			};
		}
		catch (error) {
			throw error;
		}
	}

	static async login(body){
		const user = await db.Users.findOne({where: {email: body.email, password: md5(body.password) }});
		if (!user) return {
			type: false,
			message: 'Email or password is wrong. Invalid login credentials'
		};
				
		const token = jwt.sign(
			{
				user_id: user.id,
				username: user.username,
				email: user.email
			},
			JWT_SECRET,
			{ expiresIn: 86400 }
		);

		return {
			type: true,
			message: 'You are now logged in.',
			token
		};

	}

}

export default AuthService;