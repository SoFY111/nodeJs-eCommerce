import ProductService from '../Services/ProductService';

class ProductController{

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