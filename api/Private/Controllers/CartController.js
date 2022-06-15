/**  
 * @typedef CartCreateReq
 * @property {integer} product_id
 * @property {integer} count
 */

import CartService from '../Services/CartService';
import CartValidation from '../validation/CartValidation';

import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../src/config/envKeys';

class CartController{

	/**
	 * @route GET /private/cart/get-cart
	 * @group Cart
	 * @summary Get user Cart
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	 static async getUserCart(req, res){
		try {
			const token = req.headers.authorization.split(' ')[1];
			const tokenData = jwt.verify(token, JWT_SECRET);

			const result = await CartService.getUserCart(tokenData.user_id);

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
	 * @route PUT /private/cart/add-product
	 * @group Cart
	 * @summary Add product to Cart
	 * @param {CartCreateReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async addProductToCart(req, res){
		try {
			const validation = await CartValidation.addProductToCartValidation(req.body);
			if (!validation.type) 
				res.status(400).json({type: false, message: validation.message});

			const token = req.headers.authorization.split(' ')[1];
			const tokenData = jwt.verify(token, JWT_SECRET);

			const result = await CartService.addProductToCart(tokenData.user_id, req.body);

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
	 * @route PUT /private/cart/delete-product
	 * @group Cart
	 * @summary Delete product to Cart
	 * @param {CartCreateReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	 static async deleteProductToCart(req, res){
		try {
			const validation = await CartValidation.addProductToCartValidation(req.body);
			if (!validation.type) 
				res.status(400).json({type: false, message: validation.message});

			const token = req.headers.authorization.split(' ')[1];
			const tokenData = jwt.verify(token, JWT_SECRET);

			const result = await CartService.deleteProductInCart(tokenData.user_id, req.body);

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
	 * @route GET /private/Cart/confirm-cart
	 * @group Cart
	 * @summary Confirm shopping cart
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async confirmCart(req, res){
		try {
			const token = req.headers.authorization.split(' ')[1];
			const tokenData = jwt.verify(token, JWT_SECRET);

			const result = await CartService.confirmCart(tokenData.user_id);

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

export default CartController;