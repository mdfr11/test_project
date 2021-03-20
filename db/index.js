const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db')
const sequelize = new Sequelize(dbConfig)

sequelize.authenticate().then(async () => {
  await sequelize.sync();
  console.log('Connection has been established successfully.');
}).catch(error => {
  console.error('Unable to connect to the database:', error);
})

module.exports = sequelize