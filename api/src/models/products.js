'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Products extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Products.belongsTo(models.Brands, {
				foreignKey: 'brand_id'
			});
			Products.belongsTo(models.SubCategories, {
				foreignKey: 'subCategory_id'
			});

			Products.hasMany(models.Carts, {foreignKey: 'product_id'});
			Products.hasMany(models.OrderDetails, {foreignKey: 'product_id'});
		}
	
	}
	Products.init({
		brand_id: DataTypes.INTEGER,
		subCategory_id: DataTypes.INTEGER,
		name: DataTypes.STRING,
		stock: DataTypes.INTEGER,
		price: DataTypes.DOUBLE,
		description: DataTypes.TEXT,
		isDeleted: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Products'
	});
	return Products;
};