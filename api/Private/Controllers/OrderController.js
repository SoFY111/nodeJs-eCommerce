import OrderService from '../Services/OrderService';

class OrderController{

	static async health(req, res){
		res.json({type: true, message: 'successful'});
	}

	static async CreateOrder(req, res){
		res.json({type: true, message: 'create_order'});
	}

}

export default OrderController;