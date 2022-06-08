/**  
 * @typedef ProductCreateReq
 * @property {integer} brand_id
 * @property {integer} category_id
 * @property {integer} subcategories
 * @property {string} name
 * @property {integer} stock
 * @property {integer} price
 * @property {string} description
 */
import ProductService from '../Services/ProductService';

class ProductController{

	/**
	 * @route POST /private/product/create
	 * @group Product
	 * @summary Create new product
	 * @param {ProductCreateReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async createProduct(req, res){
		try {
			const result = await ProductService.createProduct(req.body);

			if (result.type) 
				res.json({type: true, message: 'successful', data: result.data});
			else
				res.json({type: false, message: result.message});	
		}
		catch (error) {
			res.json({type: false, message: error.message});
		}
	}

	static async health(req, res){
		res.json({type: true, message: 'successful'});
	}

}

export default ProductController;