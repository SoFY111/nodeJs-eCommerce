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
				references: {
					model: 'Brands',
					key: 'id'
				}
			},
			subCategory_id: {
				type: Sequelize.INTEGER,
				references: {	
					model: 'SubCategories',
					key: 'id'
				}
			},
			name: {
				type: Sequelize.STRING
			},
			stock: {
				type: Sequelize.INTEGER
			},
			price: {
				type: Sequelize.DOUBLE
			},
			description: {
				type: Sequelize.TEXT
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