import User from "../models/user.model.js";
const authorizationMiddlware = async (req, res, next) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ mess: "Unauthorized:" });
    }

    const user = await User.findById(req.user._id).select("role");
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
