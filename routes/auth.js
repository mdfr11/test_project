const express = require('express');

const authRouter = express.Router();

authRouter.get('/test', (req, res) => {
  res.send("hello")
});

module.exports = authRouter;