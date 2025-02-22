import multer from "multer";
// Chỉ chọn được các ảnh có trong máy
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
export default upload;
