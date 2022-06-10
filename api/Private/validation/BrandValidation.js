import Joi from 'joi';

class BrandValidation{

	static async createBrandValidation(name){
		try {
			const schema = Joi.object().keys({
				name: Joi.string().min(3).required()
			});

			await schema.validateAsync(name);
			return ({type: true});
		}
		catch (error) {
			return ({type: false, message: error.message});
		}
	}

	static async deleteBrandValidation(params){
		try {
			const schema = Joi.object().keys({
				id: Joi.number().required()
			});

			await schema.validateAsync(params);
			return ({type: true});
		}
		catch (error) {
			return ({type: false, message: error.message});
		}
	}

	static async updateBrandValidation(data){
		try {
			const schema = Joi.object().keys({
				id: Joi.number().required(),
				name: Joi.string().min(3).required()
			});

			await schema.validateAsync(data);
			return ({type: true});
		}
		catch (error) {
			return ({type: false, message: error.message});
		}
	}

}

export default BrandValidation;