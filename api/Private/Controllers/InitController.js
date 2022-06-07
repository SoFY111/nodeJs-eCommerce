import InitService from '../Services/InitService';

class InitController{

	static async health(req, res){
		res.json({type: true, message: 'successful'});
	}

	static async getUserData(req, res){
		try {
			const result = await InitService.getUserRole(req);

			if (result.type) res.json({type: true, message: result.message});
			else res.json({type: false, message: result.message});
		}
		catch (error) {
			res.json({type: false, message: error.message});
		}
	}

}

export default InitController;