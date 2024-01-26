const multer = require("multer");
const path = require("node:path");

const tmpPath = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
  destination: tmpPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
