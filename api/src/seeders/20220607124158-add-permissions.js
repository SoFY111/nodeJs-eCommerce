'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		await queryInterface.bulkInsert('Permissions', [ {
			name: 'add_product',
			createdAt: new Date(),
			updatedAt: new Date()
		}, 
		{
			name: 'get_all_orders',
			createdAt: new Date(),
			updatedAt: new Date()
		}, 
		{
			name: 'approve_order',
			createdAt: new Date(),
			updatedAt: new Date()
		}, 
		{
			name: 'create_order',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'create_product',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'delete_product',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'create_brand',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'update_brand',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'delete_brand',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'update_product',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'delete_product',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'create_card',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'get_user_card',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'delete_product_on_card',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'update_card',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'delete_card',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'get_all_cards',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'add_product_to_card',
			createdAt: new Date(),
			updatedAt: new Date()
		}
		
		], {});
	},

	async down (queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		await queryInterface.bulkDelete('Permissions', null, {});
	}
};
