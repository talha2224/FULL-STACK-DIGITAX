const multer = require('multer');
const imageConfiguration = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images');
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});
const uploadImage = multer({
  storage: imageConfiguration,
});
module.exports = { uploadImage };
