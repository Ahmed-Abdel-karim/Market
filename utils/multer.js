const crypto = require("crypto");
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const keys = require("../configue/keys");

const storage = new GridFsStorage({
  url: keys.mongodbURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "images"
        };
        resolve(fileInfo);
        reject(err => {
          throw err;
        });
      });
    });
  }
});
const upload = multer({
  storage,
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "please upload a photo" }, false);
    }
  }
});
module.exports = upload;
