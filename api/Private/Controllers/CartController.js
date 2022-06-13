/**  
 * @typedef CardCreateReq
 * @property {integer} product_id
 * @property {integer} count
 */

import CartService from '../Services/CartService';
import CartValidation from '../validation/CartValidation';

import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../src/config/envKeys';

class CartController{

	/**
	 * @route GET /private/card/get-card
	 * @group Card
	 * @summary Get user card
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	 static async getUserCard(req, res){
		try {
			const token = req.headers.authorization.split(' ')[1];
			const tokenData = jwt.verify(token, JWT_SECRET);

			const result = await CartService.getUserCard(tokenData.user_id);

			if ( result.type )
				res.status(200).json({type: true, message: result.message, data: result.data});
			else
				res.status(400).json({type: false, message: result.message});
		}
		catch (error) {
			res.status(400).json({type: false, message: error.message});
			
		}
	}

	/**
	 * @route PUT /private/card/add-product
	 * @group Card
	 * @summary Add product to Card
	 * @param {CardCreateReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async addProductToCard(req, res){
		try {
			const validation = await CartValidation.addProductToCardValidation(req.body);
			if (!validation.type) 
				res.status(400).json({type: false, message: validation.message});

			const token = req.headers.authorization.split(' ')[1];
			const tokenData = jwt.verify(token, JWT_SECRET);

			const result = await CartService.addProductToCard(tokenData.user_id, req.body);

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
	 * @route PUT /private/card/delete-product
	 * @group Card
	 * @summary Delete product to Card
	 * @param {CardCreateReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	 static async deleteProductToCard(req, res){
		try {
			const validation = await CartValidation.addProductToCardValidation(req.body);
			if (!validation.type) 
				res.status(400).json({type: false, message: validation.message});

			const token = req.headers.authorization.split(' ')[1];
			const tokenData = jwt.verify(token, JWT_SECRET);

			const result = await CartService.deleteProductInCard(tokenData.user_id, req.body);

			if (result.type) 
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

	static async coniformCard(req, res){
		try {
			const token = req.headers.authorization.split(' ')[1];
			const tokenData = jwt.verify(token, JWT_SECRET);

			const result = await CartService.coniformCard(tokenData.user_id);

			if ( result.type )
				res.status(200).json({type: true, message: result.message, data: result.data});
			else
				res.status(400).json({type: false, message: result.message});
		}
		catch (error) {
			res.status(400).json({type: false, message: error.message});
			
		}
	}

}

export default CartController;