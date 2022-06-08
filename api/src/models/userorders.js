'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UserOrders extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			UserOrders.belongsToMany(models.Users, {
				through: 'UserOrders',
				foreignKey: 'user_id',
				otherKey: 'order_id'
			});
		}
	
	}
	UserOrders.init({
		user_id: DataTypes.INTEGER,
		order_id: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'UserOrders'
	});
	return UserOrders;
};