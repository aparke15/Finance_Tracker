const User = require("../models/User");

// @desc   Get user by email
// @route  GET /api/v1/users
// @access Protected
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc   Get user by email
// @route  GET /api/v1/users/user
// @access Protected
exports.getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.find({ email: email }).exec();
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
  // res.send("add a new user");
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const newUser = await User.create(req.body);

    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
