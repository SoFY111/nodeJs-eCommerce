import { Sequelize } from 'sequelize';

import db from '../../src/models';

class CardService{

	static async addProducToCard(user_id, body){

		try {

			const product = await db.Products.findOne({
				where: {
					id: body.product_id,
					isDeleted: 0
				},
				attributes: [ 'price' ]
			});

			if (!product)
				return ({type: false, message: 'product not found'});

			const control = await db.Cards.findOne({
				where: {
					product_id: body.product_id
				}
			});
			
			if (!control){
				const result = await db.Cards.create({
					user_id,
					product_id: body.product_id,
					count: body.count,
					total_price: (product.price * body.count)
				});
				if (!result)
					return ({type: false, message: 'product not added'});

				return ({type: true, message: 'successfull', data: result});	

			} 

			const result = await db.Cards.update({
				count: (body.count + control.count),
				total_price: ((product.price * body.count) + control.total_price)
			}, {
				where: {
					id: control.id
				}
			});
	
			if (!result)
				return ({type: false, message: 'product not added'});

			return ({type: true, message: 'successfull', data: result});	
		}
		catch (error) {
			throw error;
		}
	}

	static async getUserCard(user_id){
		try {
			const result = await db.Cards.findAll({
				where: {
					user_id
				},
				attributes: [ 
					'id',
					'product_id',
					[ Sequelize.col('Product.name'), 'product_name' ],
					'count',
					'total_price',
					[ Sequelize.col('Product.Brand.id'), 'brandId' ],
					[ Sequelize.col('Product.Brand.name'), 'brandName' ],
					[ Sequelize.col('Product.SubCategory.Category.id'), 'categoryId' ],
					[ Sequelize.col('Product.SubCategory.Category.name'), 'categoryName' ],
					[ Sequelize.col('Product.SubCategory.id'), 'subCategoryId' ],
					[ Sequelize.col('Product.SubCategory.name'), 'subCategoryName' ] 
				],
				include: {
					model: db.Products,
					attributes: [ ],
					include: [
						{
							model: db.Brands,
							attributes: [ ]
						},
						{
							model: db.SubCategories,
							attributes: [ ],
							include: {
								model: db.Categories,
								attributes: []
							}
						}
					]
				}
			});

			return ({type: true, message: 'successfull', data: result});

		}
		catch (error) {
			throw error;
		}
	}

}

export default CardService;