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
  const { id, password } = body;
  try {
    const result = await AuthService.login(id, password);
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

authRouter.post("/signin/new_token", async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    const result = await AuthService.updateToken(refreshToken);
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

authRouter.get("/logout", authMiddleware, async (req, res, next) => {
  const { id } = req.user;
  try {
    const result = await AuthService.logout(id);
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = authRouter;
