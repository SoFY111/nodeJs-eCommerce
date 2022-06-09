import Joi from 'Joi';

class AuthValidation{

	static async authRegisterValidation(data){
		try {
			const schema = Joi.object().keys({
				username: Joi.string().min(3).max(18).required(),
				email: Joi.string().email().required(),
				password: Joi.string().min(5).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
				name: Joi.string().min(3).required(),
				surname: Joi.string().min(3).required()
			});

			schema.validateAsync(data);

		}
		catch (error) {
			return ({type: false, message: 'invalid data'});
		}
	}

}

export default AuthValidation;