const express = require("express");
const {
  authMiddleware,
  uploadFileMiddleware,
} = require("../middlewares/index");
const { FileService } = require("../services");
const fileRouter = express.Router();

fileRouter.get("/list", authMiddleware, async (req, res, next) => {
  try {
    const result = await FileService.list(req.body);
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

fileRouter.post(
  "/upload",
  authMiddleware,
  uploadFileMiddleware,
  async (req, res, next) => {
    try {
      const result = await FileService.upload(req.file);
      res.send(result);
    } catch (error) {
      return next(error);
    }
  }
);

fileRouter.delete("/delete/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await FileService.deleteFile(id);
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

fileRouter.get("/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await FileService.get(id);
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

fileRouter.get("/download/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundFile = await FileService.get(id);
    res.download(foundFile.path);
  } catch (error) {
    return next(error);
  }
});

fileRouter.put(
  "/update/:id",
  authMiddleware,
  uploadFileMiddleware,
  async (req, res, next) => {
    const uploadingFile = req.file;
    const { id } = req.params;
    try {
      const uploadedFile = await FileService.update(uploadingFile, id);
      res.send(uploadedFile);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = fileRouter;
