import OrderService from '../Services/OrderService';

class OrderController{

	/**
	 * @route GET /private/order/
	 * @group Order
	 * @summary Get InComplete Orders
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async getInCompleteOrders(req, res){
		try {
			const result = await OrderService.getInCompleteOrders();

			if (!result.type)
				res.json({type: false, message: result.message});

			res.json({type: true, message: result.message, data: result.data});
		}
		catch (error) {
			res.json({type: false, message: error.message});
		}
	}

	/**
	 * @route GET /private/order/all
	 * @group Order
	 * @summary Get All Orders
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
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

	/**
	 * @route GET /private/order/completed
	 * @group Order
	 * @summary Get Completed Orders
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
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

	/**
	 * @route DELETE /private/order/{id}
	 * @group Order
	 * @summary Delete Order
	 * @param {number} id.path
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
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

	/**
	 * @route PUT /private/order/{id}
	 * @group Order
	 * @summary Complete Order
	 * @param {number} id.path
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
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