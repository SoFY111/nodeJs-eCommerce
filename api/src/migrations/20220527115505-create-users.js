'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				uniqe: true
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				uniqe: true
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			surname: {
				type: Sequelize.STRING,
				allowNull: false
			},
			isDeleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				default: Date.now
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				default: Date.now
			}
		});
	},
	// eslint-disable-next-line no-unused-vars
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	}
};