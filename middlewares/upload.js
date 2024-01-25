const multer = require("multer");
const path = require("node:path");
const crypto = require("node:crypto");

const tmpPath = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpPath);
  },
  filename: (req, file, cb) => {
   const extname = path.extname(file.originalname) // png
   const basename =  path.basename(file.originalname, extname) // name
   const syffix = crypto.randomUUID();
   cb(null, `${basename}-${syffix}${extname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
