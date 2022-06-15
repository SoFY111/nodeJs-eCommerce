import OrderService from '../Services/OrderService';

class OrderController{

	static async getOpenOrders(req, res){
		try {
			const result = await OrderService.getOpenOrders();

			if (!result.type)
				res.json({type: false, message: result.message});

			res.json({type: true, message: result.message, data: result.data});
		}
		catch (error) {
			res.json({type: false, message: error.message});
		}
	}

	static async getAllOrders(req, res){
		try {
			const result = await OrderService.getAllOrders();

			if (!result.type)
				res.json({type: false, message: result.message});

			res.json({type: true, message: result.message, data: result.data});
		}
		catch (error) {
			res.json({type: false, message: error.message});
		}
	}

	static async getCompletedOrders(req, res){
		try {
			const result = await OrderService.getCompletedOrders();

			if (!result.type)
				res.json({type: false, message: result.message});

			res.json({type: true, message: result.message, data: result.data});
		}
		catch (error) {
			res.json({type: false, message: error.message});
		}
	}

	static async deleteOrder(req, res){
		try {
			const result = await OrderService.deleteOrder(req.params.orderId);

			if (!result.type)
				res.json({type: false, message: result.message});

			res.json({type: true, message: result.message, data: result.data});
		}
		catch (error) {
			res.json({type: false, message: error.message});
		}
	}

	static async completeOrder(req, res){
		try {
			const result = await OrderService.completeOrder(req.params.orderId);

			if (!result.type)
				res.json({type: false, message: result.message});

			res.json({type: true, message: result.message, data: result.data});
		}
		catch (error) {
			res.json({type: false, message: error.message});
		}
	}

	static async health(req, res){
		res.json({type: true, message: 'successful'});
	}

}

export default OrderController;