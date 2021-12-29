const express = require("express");
const {
  registerUser,
  getUserByEmail,
  getAllUsers,
} = require("../controllers/userController");
const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers);

usersRouter.route("/register").post(registerUser);

usersRouter.route("/:email").get(getUserByEmail);

module.exports = usersRouter;
