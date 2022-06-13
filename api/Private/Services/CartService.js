import { Sequelize } from 'sequelize';

import db from '../../src/models';

class CartService{

	static async getUserCart(user_id){

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

	static async addProductToCart(user_id, body){
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

	static async deleteProductInCart(user_id, body){

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
				return ({type: true, message: 'product is not in your cart'});	

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

	static async confirmCart(user_id){

		const t = await db.sequelize.transaction();

		try {
			const productsInCart = await db.Carts.findAll({
				where: {
					user_id
				},
				attributes: [
					'product_id', 
					'count', 
					'total_price'
				 ]
			});	
			
			let totalPrice = 0;
			for (let i = 0;i < productsInCart.length;i++) {
				totalPrice = productsInCart[i].total_price + totalPrice;
			}
			
			const orderTable = await db.Orders.create({
			  user_id,
			  total_price: totalPrice.toFixed(2),
			  isCompleted: false
			 }, {transaction: t});  

			const newProductsInCart = productsInCart.map(v => ({...v.dataValues, order_id: orderTable.id}));

			const orderDetails = await db.OrderDetails.bulkCreate(newProductsInCart, {transaction: t});

			const deleteUserCart = await db.Carts.destroy({
				where: {
					user_id
				}
			}, {transaction: t});

			await t.commit();

			if (!deleteUserCart)
				return ({ type: false, message: 'product not created' });
	
			return ({ type: true, message: 'successful', data: orderDetails });

		}
		catch (error) {
			await t.rollback();
			return ({type: false, message: error.message});
		}

	}

}

export default CartService;