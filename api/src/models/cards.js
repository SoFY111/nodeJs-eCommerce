'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Carts extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Carts.belongsTo(models.Users, {foreignKey: 'user_id'});
			Carts.belongsTo(models.Products, {foreignKey: 'product_id'});
		}
	
	}
	Carts.init({
		user_id: DataTypes.INTEGER,
		product_id: DataTypes.INTEGER,
		count: DataTypes.INTEGER,
		total_price: DataTypes.DOUBLE
	}, {
		sequelize,
		modelName: 'Cards'
	});
	return Carts;
};