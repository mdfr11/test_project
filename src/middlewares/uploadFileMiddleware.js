const multer = require("multer");

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storageConfig }).single("file");

module.exports = upload