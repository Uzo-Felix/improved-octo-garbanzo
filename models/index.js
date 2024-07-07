require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Use environment variables for database configuration
const sequelize = new Sequelize({
  dialect: process.env.DATABASE_DIALECT || 'sqlite',
  storage: process.env.DATABASE_STORAGE || './db.development.sqlite',
  logging: false // Disable logging; default: console.log
});

// Import models
const User = require('./user')(sequelize, DataTypes);
const Organization = require('./organization')(sequelize, DataTypes);

// Define associations
User.belongsToMany(Organization, { through: 'UserOrganizations' });
Organization.belongsToMany(User, { through: 'UserOrganizations' });

// Sync database
sequelize.sync();

module.exports = {
  User,
  Organization,
  sequelize
};
