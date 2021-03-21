const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db')
const sequelize = new Sequelize(dbConfig)

sequelize.authenticate().then(async () => {
  if (dbConfig.force === 'true') {
    await sequelize.sync({ force: dbConfig.force });
    console.log('DB recreated.');
  } else {
    await sequelize.sync({ force: false });
    console.log('Connection has been established successfully.');
  }
}).catch(error => {
  console.error('Unable to connect to the database:', error);
})

module.exports = sequelize