'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('SubCategories', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Categories',
					key: 'id'
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			},
			name: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('SubCategories');
	}
};