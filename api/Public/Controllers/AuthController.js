import AuthService from '../Services/AuthService';

class AuthController{

	static async health(req, res){
		res.json({type: true, message: 'successful'});
	}

	static async register(req, res){
		try {
			const result = await AuthService.register(req.body);

			if (result.type) res.json({type: true, message: result.message});
			res.json({type: false, message: result.message});
		}
		catch (error) {
			res.json({type: false, message: error});
		}
	}

	static async login(req, res){
		try {
			const result = await AuthService.login(req.body);

			if (result.type) res.json({type: true, message: result.message, data: {token: result.token}});
			res.json({type: false, message: result.message});
		}
		catch (error) {
			res.json({type: false, message: error});
		}
	}

}

export default AuthController;