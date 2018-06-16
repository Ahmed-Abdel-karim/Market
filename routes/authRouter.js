const express = require("express");
const authController = require("../controller/authController");
const validation = require("../middleware/validation");

const authRouter = express.Router();

authRouter.post("/register", validation.register, authController.register);
authRouter.post("/login", validation.login, authController.login);
authRouter.post("/verification", authController.verification);
authRouter.post("/resending_verification", authController.resendVerification);
authRouter.post("/req_reset_password", authController.reqResetPassword);
authRouter.post("/verify_password_token", authController.verifyPassword);
authRouter.post(
  "/reset_password",
  validation.resetPassword,
  authController.resetPassword
);

module.exports = authRouter;
