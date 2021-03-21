const { User } = require("../database/models");
const { comparePassword } = require("../../utils/passwordEncryption");
const tokenUtils = require("../../utils/jwt");

const registration = async (body) => {
  const { id, password } = body;
  const foundUser = await User.findByPk(id);
  if (foundUser) {
    let err = new Error(`User already exists`);
    err.statusCode = 409;
    throw err;
  }

  const tokens = {
    accessToken: tokenUtils.generateAccessToken({ id }),
    refreshToken: tokenUtils.generateRefreshToken({ id }),
  };

  await User.create({ id, password, refreshToken: tokens.refreshToken });
  return tokens;
};

const login = async (body) => {
  const { id, password } = body;

  const foundUser = await User.findByPk(id);
  if (!foundUser) {
    let err = new Error(`User not found`);
    err.statusCode = 400;
    throw err;
  }

  const comparedPassword = comparePassword(password, foundUser.password);
  if (!comparedPassword) {
    let err = new Error(`Wrong password`);
    err.statusCode = 400;
    throw err;
  }

  return {
    accessToken: tokenUtils.generateAccessToken({ id }),
  };
};

const updateToken = async (body) => {
  const { refreshToken } = body;
  let userId;

  try {
    const verifiedToken = tokenUtils.verify(refreshToken);
    userId = verifiedToken.data.id;
  } catch (error) {
    let err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  return {
    accessToken: tokenUtils.generateAccessToken({ id: userId }),
  };
};

const logout = async (body) => {
  const { id } = body;
  const foundUser = await User.findByPk(id);
  if (!foundUser) {
    let err = new Error(`User not found`);
    err.statusCode = 400;
    throw err;
  }

  const refreshToken = tokenUtils.generateRefreshToken({ id });

  foundUser.refreshToken = refreshToken;
  foundUser.save();

  return { refreshToken };
};

module.exports = {
  registration,
  login,
  updateToken,
  logout,
};
