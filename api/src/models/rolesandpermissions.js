'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class RolesAndPermissions extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			RolesAndPermissions.belongsToMany(models.Roles, {through: 'rolesAndPermission', foreignKey: 'role_id'});
			RolesAndPermissions.belongsToMany(models.Permissions, {through: 'permRoles', foreignKey: 'permission_id'});
		}
	
	}
	RolesAndPermissions.init({
		role_id: DataTypes.INTEGER,
		permission_id: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'RolesAndPermissions'
	});
	return RolesAndPermissions;
};