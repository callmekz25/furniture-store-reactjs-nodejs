const handleImageURL = function () {
  const quill = this.quill; // Lấy instance của Quill
  const range = quill.getSelection();
  const value = prompt("Nhập URL ảnh:");
  if (value) {
    quill.insertEmbed(range.index, "image", value);
  }
};

export const setting = {
  toolbar: {
    container: [
      ["bold", "italic", "underline"],
      [{ header: [1, 2, 3, 4] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: ["#c31425"] }, { background: [] }],
      ["link", "image"],
    ],
    handlers: {
      image: handleImageURL, // Định nghĩa lại hàm image handler
    },
  },
};

export const formats = [
  "bold",
  "italic",
  "underline",
  "color", // Kích hoạt màu chữ
  "background", // Kích hoạt màu nền
  "header",
  "list",
  "bullet",
  "link",
  "image",
];
