const express = require("express");
const UserController = require("../controllers/user/userController");
const AuthController = require("../controllers/user/authController");
const EmsController = require("../controllers/user/emsController");
const verifySignUp = require("../middleware/verifySignUpMiddleware");
const checkAuth = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.post("/signup", verifySignUp, AuthController.createUser);
userRouter.post("/login", AuthController.userLogin);

userRouter.post("/user-login-dtls", checkAuth.verifyToken,UserController.getUser);
userRouter.patch("/update", checkAuth.verifyToken,UserController.updateUser);


//EMS screen routes
userRouter.get("/getEmployees",[checkAuth.verifyToken,checkAuth.isAdmin],EmsController.getAllEmployee);
userRouter.patch("/updateEmployeePersonalDetails",[checkAuth.verifyToken,checkAuth.isAdmin],EmsController.updateEmployeePersonalData);
userRouter.patch("/updateEmployeeProfessionalData",[checkAuth.verifyToken,checkAuth.isAdmin],EmsController.updateEmployeeProfessionalData);
userRouter.patch("/updateEmployeeSettingsControlsData",[checkAuth.verifyToken,checkAuth.isAdmin],EmsController.updateEmployeeSettingsControlsData);
userRouter.delete("/deleteEmployee/:id",[checkAuth.verifyToken,checkAuth.isAdmin],EmsController.deleteEmployee);
userRouter.post("/checkEmailExist",[checkAuth.verifyToken,checkAuth.isAdmin],EmsController.isEmailExist);
userRouter.post("/onboardEmployee",[checkAuth.verifyToken,checkAuth.isAdmin],EmsController.onboardNewEmployee);

userRouter.get("/all", UserController.allAccess);
userRouter.get("/user", checkAuth.verifyToken, UserController.userBoard);

userRouter.get(
  "/mod",
  [checkAuth.verifyToken, checkAuth.isModerator],
  UserController.moderatorBoard
);

userRouter.get(
  "/admin",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  UserController.adminBoard
);

module.exports = userRouter;
