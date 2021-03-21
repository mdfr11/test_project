const express = require('express');
const { User } = require('../database/models');
const { authMiddleware } = require('../middlewares');

const authRouter = express.Router();

authRouter.get('/info', authMiddleware, async (req, res, next) => {
  const { id } = req.user
  const foundUser = await User.findByPk(id)
  if (!foundUser) {
    let err = new Error(`User not found`);
    err.statusCode = 400;
    return next(err);
  }

  res.send({ id: foundUser.id })
});

module.exports = authRouter;