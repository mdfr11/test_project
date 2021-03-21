const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

const signin = (data) => {
  return {
    accessToken: jwt.sign(
      {
        data,
      },
      config.secret,
      { expiresIn: config.expiresIn }
    ),
    refreshToken: jwt.sign(
      {
        data,
      },
      config.secret
    ),
  };
};

module.exports = {
  signin,
};
