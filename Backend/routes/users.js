var express = require("express");
var router = express.Router();

const authController = require("../controller/auth");
const usersController = require("../controller/usersController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/", authController.authorize, usersController.getAllUsers);
// router.get("/:name",authController.authorize,usersController.getByFullName)
router.get("/:email", authController.authorize, usersController.getByEmail);
router.delete("/:email", authController.authorize, usersController.deleteUser);
router.put("/:email", authController.authorize, usersController.UpdateUser);

router.use("/", authController.authorize);
module.exports = router;
