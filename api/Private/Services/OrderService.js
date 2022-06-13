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
						[ Sequelize.col('Product.name', ), 'pr_name' ] //TODO 
					],
					include: {
						model: db.Products,
						attributes: [ 'name' ]
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