const tokenUtils = require("../../utils/jwt");

module.exports = async (req, res, next) => {
  let token;

  if (req.headers && req.headers["authorization"]) {
    token = req.headers["authorization"].split("Bearer ")[1];
  }

  if (!token) {
    let err = new Error(`No access token passed`);
    err.statusCode = 400;
    return next(err);
  }

  try {
    const verifiedToken = tokenUtils.verify(token);
    req.user = verifiedToken.data;
    next();
  } catch (error) {
    let err = new Error(error.message);
    err.statusCode = 400;
    return next(err);
  }
};
