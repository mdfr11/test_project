const { encryptPassword } = require('../../../utils/passwordEncryption.js')
const Sequelize = require('sequelize');
const db = require('../index');

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.STRING,
      unique: true,
      length: 255,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: user => {
        user.password = encryptPassword(user.password)
      }
    },
    sequelize: db,
    modelName: 'user',
    timestamps: true,
    tableName: 'users',
  }
);

module.exports = User;