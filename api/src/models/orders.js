'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Orders extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
		}
	
	}
	Orders.init({
		user_id: DataTypes.INTEGER,
		productIdsandCount: DataTypes.TEXT,
		total_price: DataTypes.DOUBLE
	}, {
		sequelize,
		modelName: 'Orders'
	});
	return Orders;
};