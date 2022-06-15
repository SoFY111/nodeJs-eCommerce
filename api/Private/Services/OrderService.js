import { Sequelize } from 'sequelize';
import db from '../../src/models';

class OrderService{

	static async getOpenOrders(){
		try {
			const result = await db.Orders.findAll({
				where: {
					isCompleted: false,
					isDeleted: false
				},
				attributes: [ 'id', 'user_id', 'total_price', 'isCompleted', 'isDeleted' ],
				include: {
					model: db.OrderDetails,
					attributes: [ 
						'id',
						'product_id',
						'count',
						'total_price',
						[ Sequelize.fn('', Sequelize.col('OrderDetails.Product.name')), 'product_name' ]
					],
					include: {
						model: db.Products,
						attributes: [  ]
					}
				}
			});

			if (!result)
				return ({type: false, message: 'order not found'});

			return ({type: true, message: 'successful', data: result});
		}
		catch (error) {
			throw error;
		}
	}

	static async getAllOrders(){
		try {
			const result = await db.Orders.findAll({
				where: {
					isDeleted: false
				},
				attributes: [ 'id', 'user_id', 'total_price', 'isCompleted', 'isDeleted' ],
				include: {
					model: db.OrderDetails,
					attributes: [ 
						'id',
						'product_id',
						'count',
						'total_price',
						[ Sequelize.fn('', Sequelize.col('OrderDetails.Product.name')), 'product_name' ]
					],
					include: {
						model: db.Products,
						attributes: [  ]
					}
				}
			});

			if (!result)
				return ({type: false, message: 'order not found'});

			return ({type: true, message: 'successful', data: result});
		}
		catch (error) {
			throw error;
		}
	}

	static async getCompletedOrders(){
		try {
			const result = await db.Orders.findAll({
				where: {
					isCompleted: true,
					isDeleted: false
				},
				attributes: [ 'id', 'user_id', 'total_price', 'isCompleted', 'isDeleted' ],
				include: {
					model: db.OrderDetails,
					attributes: [ 
						'id',
						'product_id',
						'count',
						'total_price',
						[ Sequelize.fn('', Sequelize.col('OrderDetails.Product.name')), 'product_name' ]
					],
					include: {
						model: db.Products,
						attributes: [  ]
					}
				}
			});

			if (!result)
				return ({type: false, message: 'order not found'});

			return ({type: true, message: 'successful', data: result});
		}
		catch (error) {
			throw error;
		}
	}

	static async deleteOrder(orderId){
		try {
			
			const result = await db.Orders.update({
				isDeleted: true
			}, {
				where: {
					id: orderId
				}
			});

			if (!result)
				return ({type: false, message: 'order not deleted'});
	
			return ({type: true, message: 'successfull', data: result});

		}
		catch (error) {
			return ({type: false, message: error.message});
		}
	}

	static async completeOrder(orderId){
		try {
			
			const result = await db.Orders.update({
				isCompleted: true
			}, {
				where: {
					id: orderId,
					isDeleted: false
				}
			});

			if (!result)
				return ({type: false, message: 'order not completed'});
	
			return ({type: true, message: 'successfull', data: result});

		}
		catch (error) {
			return ({type: false, message: error.message});
		}
	}

}

export default OrderService;