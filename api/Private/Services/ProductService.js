import { Sequelize } from 'sequelize';
import db from '../../src/models';

class ProductService{

	static async createProduct(body){
		try {

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
			
			if (error.name === 'SequelizeForeignKeyConstraintError')
				return ({ 
					type: false, 
					message: `product not created, foreign_key_error: ${error.parent.constraint}` 
				}); 

			throw error;
		}
	}

	static async getProducts(){
		try {
			const result = await db.Products.findAll({
				where: {
					isDeleted: 0
				},
				attributes: [ 
					'id',
					'name',
					'stock',
					'price',
					'description',
					[ Sequelize.col('Brand.id'), 'brandId' ],
					[ Sequelize.col('Brand.name'), 'brandName' ],
					[ Sequelize.col('SubCategory.Category.id'), 'categoryId' ],
					[ Sequelize.col('SubCategory.Category.name'), 'categoryName' ],
					[ Sequelize.col('SubCategory.id'), 'subCategoryId' ],
					[ Sequelize.col('SubCategory.name'), 'subCategoryName' ],
					'isDeleted'
				],
				include: [
					{
						model: db.Brands,
						attributes: [  ]
					},
					{
						model: db.SubCategories,
						attributes: [  ],
						include: {
							model: db.Categories,
							attributes: [  ]
						}
					}
				]
			});

			if (!result)
				return ({ type: false, message: 'products not found' });
	
			return ({ type: true, message: 'successful', data: result });
		}
		catch (error) {
			throw error;
		}
	}

	static async deleteProduct(productId){
		try {
			const result = await db.Products.update({
				isDeleted: 1
			}, {
				where: {
					id: productId
				}
			}); 
			
			if (!result)
				return ({ type: false, message: 'products not deleted' });
			
			return ({ type: true, message: 'successful', data: result}); 
			
		}
		catch (error) {
			throw error;
		}
	}

}

export default ProductService;