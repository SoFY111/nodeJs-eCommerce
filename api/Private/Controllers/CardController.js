/**  
 * @typedef CardCreateReq
 * @property {integer} product_id
 * @property {integer} count
 */

import CardService from '../Services/CardService';
import CardValidation from '../validation/CardValidation';

import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../src/config/envKeys';

class CardController{

	/**
	 * @route POST /private/card/
	 * @group Card
	 * @summary Add product to Card
	 * @param {CardCreateReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async addProductToCard(req, res){
		try {
			const validation = await CardValidation.addProductToCardValidation(req.body);
			if (!validation.type) 
				res.status(400).json({type: false, message: validation.message});

			const token = req.headers.authorization;
			const tokenData = jwt.verify(token, JWT_SECRET);

			const result = await CardService.addProducToCard(tokenData.user_id, req.body);

			if (result.type) 
				res.status(200).json({type: true, message: result.message, data: result.data});
			else
				res.status(400).json({type: false, message: result.message});

		}
		catch (error) {
			res.status(400).json({type: false, message: error.message});
		}
	}

	/**
	 * @route GET /private/card/
	 * @group Card
	 * @summary Get user card
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async getUserCard(req, res){
		try {
			const token = req.headers.authorization;
			const tokenData = jwt.verify(token, JWT_SECRET);

			const result = await CardService.getUserCard(tokenData.user_id);

			if ( result.type )
				res.status(200).json({type: true, message: result.message, data: result.data});
			else
				res.status(400).json({type: false, message: result.message});
		}
		catch (error) {
			res.status(400).json({type: false, message: error.message});
			
		}
	}

	static async health(req, res){
		res.json({type: true, message: 'successful'});
	}

}

export default CardController;