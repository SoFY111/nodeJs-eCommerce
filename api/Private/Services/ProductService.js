import db from '../../src/models';

class ProductService{

	static async createProduct(body){
		try {
			if (
				!body.brand_id, 
				!body.subcategory_id,
				!body.name,
				!body.stock,
				!body.price,
				!body.description
			)
				return ({ type: false, message: 'enter all columns' });

			console.log(body);

			const result = await db.Products.create({
				brand_id: body.brand_id, 
				subCategory_id: body.subCategory_id,
				name: body.name, 
				stock: body.stock,
				price: body.price,
				description: body.description
			});
			if (!result)
				return ({ type: false, message: 'product not created' });
	
			return ({ type: true, message: 'successful', data: result });

		}
		catch (error) {
			/*
			 * if (error.name === 'SequelizeForeignKeyConstraintError')
			 * return ({ type: false, message: 'product not created, foreign_key_error' }); 
			 */

			throw error;
		}
	}

}

export default ProductService;