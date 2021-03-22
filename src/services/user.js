const { User } = require('../database/models');

const getInfo = async (id) => {
  const foundUser = await User.findByPk(id)
  if (!foundUser) {
    let err = new Error(`User not found`);
    err.statusCode = 400;
    throw err
  }

  return { id: foundUser.id }
}

module.exports = {
  getInfo
};