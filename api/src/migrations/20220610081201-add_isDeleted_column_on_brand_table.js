'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		queryInterface.addColumn('Brands', 'isDeleted', {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false
		});
	},

	async down (queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		queryInterface.removeColumn('Brands', 'isDeleted');
	}
};
