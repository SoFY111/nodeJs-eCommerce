'use strict';

const md5 = require('md5');

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

		await queryInterface.bulkInsert('Users', [ {
			username: 'admin-hkn',
			name: 'Hakan',
			surname: 'DİNÇTÜRK',
			email: 'hkn@g.co',
			password: md5('123456'),
			isDeleted: false,
			createdAt: new Date(),
			updatedAt: new Date()
		}, 
		{
			username: 'user-brk',
			name: 'Burak',
			surname: 'YILMAZER',
			email: 'brk@g.co',
			password: md5('123456'),
			isDeleted: false,
			createdAt: new Date(),
			updatedAt: new Date()
		}
  
		], {});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	}
};
