import OrderService from '../Services/OrderService';

class OrderController{

	static async health(req, res){
		res.json({type: true, message: 'successful'});
	}

}

export default OrderController;