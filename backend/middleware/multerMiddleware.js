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
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB/ảnh
}).fields([
  { name: "productImages", maxCount: 20 }, // 5 ảnh cho sản phẩm chính
  { name: "variantImages", maxCount: 20 }, // 20 ảnh cho variants
]);

export default upload;
