require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
  dialect: 'postgres'
});

const User = require('./user')(sequelize, DataTypes);
const Organization = require('./organization')(sequelize, DataTypes);

User.belongsToMany(Organization, { through: 'UserOrganizations' });
Organization.belongsToMany(User, { through: 'UserOrganizations' });

sequelize.sync();

module.exports = {
  User,
  Organization,
  sequelize
};
