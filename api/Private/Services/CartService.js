import { Sequelize } from 'sequelize';

import db from '../../src/models';

class CartService{

	static async getUserCard(user_id){

		try {
			const result = await db.Carts.findAll({
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

	static async addProductToCard(user_id, body){

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

			const control = await db.Carts.findOne({
				where: {
					product_id: body.product_id
				}
			});
			
			if (!control){
				const result = await db.Carts.create({
					user_id,
					product_id: body.product_id,
					count: body.count,
					total_price: (product.price * body.count)
				});
				if (!result)
					return ({type: false, message: 'product not added'});

				return ({type: true, message: 'successfull', data: result});	

			} 

			const result = await db.Carts.update({
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

	static async deleteProductInCard(user_id, body){

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

			const control = await db.Carts.findOne({
				where: {
					user_id: user_id,
					product_id: body.product_id
				}
			});
			
			if (!control)
				return ({type: true, message: 'product is not in your card'});	

			else {
				let result;
				if (control.count - body.count <= 0) {
					result = await db.Carts.destroy({
						where: {
							id: control.id
						}
					});	
				}
				else {
					result = await db.Carts.update({
						count: (control.count - body.count),
						total_price: (control.total_price - (product.price * body.count))
					}, {
						where: {
							id: control.id
						}
					});
				}
		
				if (!result)
					return ({type: false, message: 'product not deleteds'});
	
				return ({type: true, message: 'successfull', data: result});
			}	
		}
		catch (error) {
			throw error;
		}
	}

	static async coniformCard(user_id){

		const result = await db.Users.findOne({
			where: {
				id: user_id,
				isDeleted: false
			},
 			attributes: [ 'username', 'email' ],
			include: {
				model: db.Carts,
				attributes: [ 'product_id', 'count', 'total_price' ]
			}
		});

		/*
		 * const result = await db.Carts.findAll({
		 * where: {
		 * user_id
		 * },
		 * attributes: [ 
		 * 'product_id',
		 * [ Sequelize.col('Product.name'), 'product_name' ],
		 * 'count',
		 * 'total_price'
		 * ],
		 * include: {
		 * model: db.Products,
		 * attributes: [ ],
		 * include: [
		 * {
		 *	 model: db.Brands,
		 *	 attributes: [ ]
		 * }
		 * ]
		 * }
		 * }); 
		 */

		return ({type: true, message: 'successful', data: result});
	}

}

export default CartService;