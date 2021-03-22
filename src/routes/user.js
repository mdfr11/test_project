const express = require('express');
const { UserService } = require('../services');

const authRouter = express.Router();

authRouter.get('/info', authMiddleware, async (req, res, next) => {
  try {
    const result = await UserService.getInfo(req.user.id)
    res.send(result)
  } catch (error) {
    return next(error);
  }
});

module.exports = authRouter;