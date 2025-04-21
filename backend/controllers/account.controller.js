const getAccount = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};
export { getAccount };
