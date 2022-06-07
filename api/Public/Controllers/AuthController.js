/**
 * @typedef AuthReq
 * @property {string} email
 * @property {string} username
 * @property {string} name
 * @property {string} surname
 * @property {string} password
 */

import AuthService from '../Services/AuthService';

class AuthController{

	static async health(req, res){
		res.json({type: true, message: 'successful'});
	}

	static async register(req, res){
		try {
			const result = await AuthService.register(req.body);

			if (result.type) res.json({type: true, message: result.message});
			else res.json({type: false, message: result.message});
		}
		catch (error) {
			res.json({type: false, message: error.message});
		}
	}

	static async login(req, res){
		try {
			const result = await AuthService.login(req.body);

			if (result.type) res.json({type: true, message: result.message, data: {token: result.token}});
			else res.json({type: false, message: result.message});
		}
		catch (error) {
			res.json({type: false, message: error.message});
		}
	}

}

export default AuthController;