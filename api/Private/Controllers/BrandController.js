/**  
 * @typedef BrandCreateReq
 * @property {string} name
 */

import BrandService from '../Services/BrandService';
import joi from 'joi';

class BrandController{

	/**
	 * @route POST /private/brand/
	 * @group Brand
	 * @summary Create new brand
	 * @param {BrandCreateReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async createBrand(req, res){
		try {
			
			const schema = joi.object().keys({
				name: joi.string().min(3).required()
			});

			await schema.validateAsync(req.body);

			const result = await BrandService.createBrand(req.body);
      
			if (result.type)
				res.json({type: true, message: 'successful', data: result.data});
			else
				res.status(400).json({type: false, message: result.message});	
		}
		catch (error) {
			res.status(400).json({type: false, message: error.message});
		}
	}

	/**
	 * @route GET /private/brand/
	 * @group Brand
	 * @summary Get all brands
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async getBrands(req, res){
		try {
			const result = await BrandService.getBrands();
      
			if (result.type)
				res.json({type: true, message: 'successful', data: result.data});
			else
				res.status(400).json({type: false, message: result.message});	
		}
		catch (error) {
			res.status(400).json({type: false, message: error.message});
		}
	}

	/**
	 * @route DELETE /private/brand/{id}
	 * @group Brand
	 * @summary Delete specific brand
	 * @param {number} id.path
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async deleteBrand(req, res){
		try {

			const schema = joi.object().keys({
				id: joi.number().required()
			});

			await schema.validateAsync(req.params);

			const result = await BrandService.deleteBrand(req.params.id);
      
			if (result.type)
				res.json({type: true, message: 'successful', data: result.data});
			else
				res.status(400).json({type: false, message: result.message});	
		}
		catch (error) {
			res.status(400).json({type: false, message: error.message});
		}
	}

	/**
	 * @route PUT /private/brand/{id}
	 * @group Brand
	 * @summary Update specific brand
	 * @param {number} id.path
	 * @param {BrandCreateReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async updateBrand(req, res){
		try {
			const result = await BrandService.updateBrand(req.params.id, req.body);
      
			if (result.type)
				res.json({type: true, message: 'successful', data: result.data});
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

export default BrandController;