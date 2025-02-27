import jwt from "jsonwebtoken";

const optionalAuthMiddleware = (req, res, next) => {
  // Lấy token từ cookies
  const token = req.cookies.accessToken;

  if (!token) {
    return next();
  }
  // Kiểm tra xác thực access token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    // Nếu access token hết hạn, kiểm tra refresh token

    if (err) {
      return next();
    }
    req.user = user;
    console.log(user);

    return next();
  });
};
export default optionalAuthMiddleware;
