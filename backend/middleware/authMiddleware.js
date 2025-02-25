import jwt from "jsonwebtoken";
// Middleware để kiểm tra token
const authMiddleware = (req, res, next) => {
  // Lấy token từ cookies
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ mess: "Unauthorization" });
  }
  // Kiểm tra xác thực access token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    // Nếu access token hết hạn, kiểm tra refresh token
    if (err) {
      return res.status(403).json({ mess: "Forbidden" });
    }
    req.user = user;
    next();
  });
};
export default authMiddleware;
