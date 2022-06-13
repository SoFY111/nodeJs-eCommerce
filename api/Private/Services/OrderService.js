import { Sequelize } from 'sequelize';
import db from '../../src/models';

class OrderService{

	static async getOrders(){
		try {
			const result = await db.Orders.findAll({
				attributes: [ 'id', 'user_id', 'total_price', 'isCompleted' ],
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

}

export default OrderService;