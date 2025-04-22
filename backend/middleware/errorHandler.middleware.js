const errorHandler = (err, req, res, next) => {
  if (err.status && err.message) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log(err.status);

  console.error("Unhandled error:", err);
  return res.status(500).json({ message: "Internal Server Error" });
};
export default errorHandler;
