const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

const generateRefreshToken = (data) => {
  return jwt.sign(
    {
      data,
    },
    config.secret,
    { expiresIn: parseInt(config.refreshExpiresIn) }
  );
};

const generateAccessToken = (data) => {
  return jwt.sign(
    {
      data,
    },
    config.secret,
    { expiresIn: parseInt(config.accessExpiresIn) }
  );
};

const verify = (token) => {
  return jwt.verify(token, config.secret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verify,
};
