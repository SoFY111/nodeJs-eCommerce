import Joi from 'joi';

class CardValidation{

	static async addProductToCardValidation(body){

		try {
			const schema = Joi.object().keys({
				product_id: Joi.number().required(),
				count: Joi.number().integer().min(1).required()
			});

			await schema.validateAsync(body);
			return ({ type: true });
		}
		catch (error) {
			return ({type: false, message: error.message});
		}
	}

}

export default CardValidation;