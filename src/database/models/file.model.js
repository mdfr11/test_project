const { encryptPassword } = require("../../../utils/passwordEncryption.js");
const Sequelize = require("sequelize");
const db = require("../index");

class File extends Sequelize.Model {}

File.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.TEXT
    },
    extension: {
      type: Sequelize.TEXT
    },
    mimeType: {
      type: Sequelize.TEXT
    },
    size: {
      type: Sequelize.BIGINT,
      unsigned: true,
    },
    path: {
      type: Sequelize.TEXT
    },
  },
  {
    sequelize: db,
    modelName: "file",
    timestamps: true,
    tableName: "files",
  }
);

module.exports = File;
