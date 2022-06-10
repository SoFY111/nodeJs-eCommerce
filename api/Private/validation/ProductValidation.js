import Joi from 'joi';

class ProductValidation{

	static async createProductValidation(body){
		try {
			const schema = Joi.object().keys({
				brand_id: Joi.number().required(),
				subCategory_id: Joi.number().required(),
				name: Joi.string().min(3).max(30).required(),
				stock: Joi.number().required(),
				price: Joi.number().required(),
				description: Joi.string().min(3).required()
			});

			await schema.validateAsync(body);
			return ({type: true});
		}
		catch (error) {
			return ({type: false, message: error.message});
		}
	}

	static async deleteProductValidation(params){
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

}

export default ProductValidation;