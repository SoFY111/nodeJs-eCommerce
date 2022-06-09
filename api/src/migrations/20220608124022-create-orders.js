'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Orders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id'
				}
			},
			productIdsandCount: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			total_price: {
				type: Sequelize.DOUBLE,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Orders');
	}
};