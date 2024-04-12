const path = require("path");
const multer = require("multer");
const imgPath = "/uploads/user";
const prisma = require('../config/prisma');
const user = prisma.User;

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", imgPath));
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + extension);
  },
});

const uploadImgPath = multer({ storage: imageStorage }).single("image");

module.exports = { user, uploadImgPath, imgPath };


