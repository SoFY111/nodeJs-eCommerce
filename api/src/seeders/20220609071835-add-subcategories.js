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

		await queryInterface.bulkInsert('SubCategories', [
			{
				category_id: 1,
				name: 'First SubCategory (1,1)',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				category_id: 1,
				name: 'Second SubCategory (1,2)',
				createdAt: new Date(),
				updatedAt: new Date()
			}, 
			{
				category_id: 2,
				name: '3rd SubCategory (2,1)',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				category_id: 2,
				name: '4th SubCategory (2,2)',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				category_id: 2,
				name: '5th SubCategory (2,3)',
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

		await queryInterface.bulkDelete('SubCategories', [], {});
	}
};
