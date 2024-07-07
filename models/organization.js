module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('Organization', {
      orgId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      }
    });
  
    return Organization;
  };
  