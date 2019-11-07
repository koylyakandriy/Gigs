const Sequelize = require('sequelize');

 module.exports = new Sequelize('codegig', 'postgres', 'admin', {
	host: 'localhost',
	dialect: 'postgres'
});