import OrderService from '../Services/OrderService';

class OrderController{

	static async getOrders(req, res){
		try {
			const result = await OrderService.getOrders();

			if (!result.type)
				res.json({type: false, message: result.message});

			res.json({type: true, message: result.message, data: result.data});
		}
		catch (error) {
			res.json({type: false, message: error.message});
		}
	}

	static async CreateOrder(req, res){
		res.json({type: true, message: 'create_order'});
	}

	static async health(req, res){
		res.json({type: true, message: 'successful'});
	}

}

export default OrderController;