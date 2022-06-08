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
			Products.belongsTo(models.Brands, {foreignKey: 'brand_id'});
			Products.belongsTo(models.Categories, {foreignKey: 'category_id'});
		}
	
	}
	Products.init({
		brand_id: DataTypes.INTEGER,
		category_id: DataTypes.INTEGER,
		subCategories: DataTypes.INTEGER,
		name: DataTypes.STRING,
		stock: DataTypes.INTEGER,
		price: DataTypes.DOUBLE,
		description: DataTypes.TEXT
	}, {
		sequelize,
		modelName: 'Products'
	});
	return Products;
};