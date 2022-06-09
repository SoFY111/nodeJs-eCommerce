/**
 * @typedef AuthReq
 * @property {string} email
 * @property {string} username
 * @property {string} name
 * @property {string} surname
 * @property {string} password
 *
 */

/** 
 * @typedef AuthReqLogin
 * @property {string} email
 * @property {string} password
 */

import AuthService from '../Services/AuthService';

class AuthController{

	static async health(req, res){
		res.json({type: true, message: 'successful'});
	}
	
	/** 
	 * @route POST /public/auth/
	 * @group Auth
	 * @summary Create new user
	 * @param {AuthReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
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

	/**
	 * @route POST /public/auth/login
	 * @group Auth
	 * @summary Login
	 * @param { AuthReqLogin.model } body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
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