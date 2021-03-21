const { File } = require("../database/models");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const getFileInfo = (file) => {
  return {
    name: file.originalname,
    extension: file.originalname.substr(file.originalname.lastIndexOf(".") + 1),
    mimeType: file.mimetype,
    size: file.size,
    path: file.path,
  };
};

const list = async (body) => {
  const { list_size = 10, page = 1 } = body;

  const foundFiles = await File.findAndCountAll({
    limit: list_size,
    offset: page,
  });

  return foundFiles;
};

const upload = async (uploadingFile) => {
  if (!uploadingFile) {
    let err = new Error(`File not found`);
    err.statusCode = 400;
    throw err;
  }

  const uploadingFileInfo = getFileInfo(uploadingFile);

  const uploadedFile = await File.create(uploadingFileInfo);
  return uploadedFile;
};

const deleteFile = async (id) => {
  const foundFile = await File.findByPk(id);
  if (!foundFile) {
    let err = new Error(`File not found`);
    err.statusCode = 400;
    throw err;
  }

  await foundFile.destroy();

  unlinkAsync(foundFile.path).catch((error) => {
    let err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  });

  return {
    message: "File successful deleted",
  };
};

const get = async (id) => {
  const foundFile = await File.findByPk(id);
  if (!foundFile) {
    let err = new Error(`File not found`);
    err.statusCode = 400;
    throw err;
  }

  return foundFile;
};

const update = async (uploadingFile, id) => {
  if (!uploadingFile) {
    let err = new Error(`File not found`);
    err.statusCode = 400;
    return next(err);
  }

  const foundFile = await File.findByPk(id);
  if (!foundFile) {
    let err = new Error(`File not found`);
    err.statusCode = 400;
    return next(err);
  }

  const uploadingFileInfo = getFileInfo(uploadingFile);

  const uploadedFile = await foundFile.update(uploadingFileInfo);
  return uploadedFile;
};

module.exports = {
  list,
  upload,
  deleteFile,
  get,
  update,
};
