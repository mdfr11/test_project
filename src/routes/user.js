const express = require('express');
const { User } = require('../database/models');
const { authMiddleware } = require('../middlewares');

const authRouter = express.Router();

authRouter.get('/info', authMiddleware, async (req, res, next) => {
  try {
    const result = await authService.logout(req.user)
    res.send(result)
  } catch (error) {
    return next(error);
  }
});

module.exports = authRouter;