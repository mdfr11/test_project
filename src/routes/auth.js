const express = require("express");
const { authMiddleware } = require("../middlewares/index");
const { AuthService } = require("../services/index");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res, next) => {
  try {
    const result = await AuthService.registration(req.body);
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

authRouter.post("/signin", async (req, res, next) => {
  try {
    const result = await AuthService.login(req.body);
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

authRouter.post("/signin/new_token", async (req, res, next) => {
  try {
    const result = await AuthService.updateToken(req.body);
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

authRouter.get("/logout", authMiddleware, async (req, res, next) => {
  try {
    const result = await AuthService.logout(req.user);
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = authRouter;
