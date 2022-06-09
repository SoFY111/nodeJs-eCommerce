'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			brand_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Brands',
					key: 'id'
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			},
			subCategory_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {	
					model: 'SubCategories',
					key: 'id'
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			stock: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			price: {
				type: Sequelize.DOUBLE,
				allowNull: false
			},
			description: {
				type: Sequelize.TEXT,
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
		await queryInterface.dropTable('Products');
	}
};