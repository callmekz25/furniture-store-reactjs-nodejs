import httpRequest from "./config";

const handleUploadFiles = async (files: File[], productId: string) => {
  const formData = new FormData();
  files.forEach((file: File) => {
    formData.append("files", file);
  });
  formData.append("productId", productId);
  try {
    const res = await httpRequest.post("/upload-files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data) {
      return res.data;
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};
export { handleUploadFiles };
