import db from '../../src/models';

class ProductService{

	static async createProduct(body){
		try {
			if (
				!body.brand_id, 
				!body.categories_id, 
				!body.subcategories_id,
				!body.name,
				!body.stock,
				!body.price,
				!body.description
			)
				return ({ type: false, message: 'enter all columns' });

			console.log(body);

			const result = await db.Products.create({
				brand_id: body.brand_id, 
				category_id: body.category_id, 
				subCategories: body.subcategories,
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
			throw error;
		}
	}

}

export default ProductService;