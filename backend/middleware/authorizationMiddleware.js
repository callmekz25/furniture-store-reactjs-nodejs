import User from "../models/userModel.js";
const authorizationMiddlware = async (req, res, next) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ mess: "Unauthorized:" });
    }

    const user = await User.findById(req.user.userId).select("role");
    if (!user) {
      return res.status(401).json({ mess: "Unauthorized" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ mess: "Forbidden" });
    }

    next();
  } catch (error) {
    res.status(500).json({ mess: "Internal Server Error" });
  }
};

export default authorizationMiddlware;
