const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: 'localhost',
	dialect: 'mysql',
	dialectModule: require('mysql2')
});

const User = sequelize.define('User', {
	id: {
		type: DataTypes.STRING, // Do tipo string porque o id vem do firebase
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

module.exports = { User, sequelize };

