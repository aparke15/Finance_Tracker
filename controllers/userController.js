const User = require("../models/User");

// @desc   Get user by email
// @route  GET /api/v1/users
// @access Protected
exports.getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.find(email);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await User.create();
  } catch (error) {}
};
