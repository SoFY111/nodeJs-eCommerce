'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class SubCategories extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			SubCategories.belongsTo(models.Categories, {
				foreignKey: 'category_id'
			});
		}
	
	}
	SubCategories.init({
		category_id: DataTypes.INTEGER,
		name: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'SubCategories'
	});
	return SubCategories;
};