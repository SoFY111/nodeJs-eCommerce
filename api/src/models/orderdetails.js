'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class OrderDetails extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			OrderDetails.belongsTo(models.Orders, {foreignKey: 'order_id'});
			OrderDetails.belongsTo(models.Products, {foreignKey: 'product_id'});
		}
	
	}
	OrderDetails.init({
		order_id: DataTypes.INTEGER,
		product_id: DataTypes.INTEGER,
		count: DataTypes.INTEGER,
		total_price: DataTypes.DOUBLE
	}, {
		sequelize,
		modelName: 'OrderDetails'
	});
	return OrderDetails;
};