import LoginAuthService from '../Services/LoginAuthService';

class LoginAuthController{

	static async register(req, res){
		try {
			const result = await LoginAuthService.register(req.body);

			res.json({type: 200, message: result.message});
		}
		catch (error) {
			res.json({type: 400, message: error});
		}
	}

	static async login(req, res){
		try {
			const result = await LoginAuthService.login(req.body);

			res.json({ type: 200, message: result.message, token: result.token });
		}
		catch (error) {
			res.json({type: 400, message: error});
		}
	}

}

export default LoginAuthController;