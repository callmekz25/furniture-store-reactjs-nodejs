import jwt from "jsonwebtoken";
// Middleware để kiểm tra token
const authenToken = (req, res, next) => {
  // Lấy token từ cookies
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) {
    return res.status(401).json({ mess: "Unauthorization token" });
  }
  // Kiểm tra xác thực access token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
    // Nếu access token hết hạn, kiểm tra refresh token
    if (err) {
      // const refreshToken = req.cookies.refreshToken;
      // if (refreshToken) {
      // }
      return res.status(401).json({ mess: "Expired token" });
    }
    next();
  });
};
export default authenToken;
