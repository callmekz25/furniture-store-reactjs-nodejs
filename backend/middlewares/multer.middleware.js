import multer from "multer";

// Cấu hình Multer chỉ lưu filename (không lưu vào disk)
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Khởi tạo Multer với `.fields()` để upload nhiều loại ảnh
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: "productImages", maxCount: 40 },
  { name: "variantImages", maxCount: 50 },
]);

export default upload;
