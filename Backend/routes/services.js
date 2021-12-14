const express = require("express");
const router = express.Router();
const ServiceController = require("../controller/serviceController");
const authController = require("../controller/auth");

router.get("/provide", ServiceController.getProvided);
router.get("/request", ServiceController.getRequested);
router.get("/:id", ServiceController.getById);
router.get("/:id/comments", ServiceController.getComments);
router.get("/name", ServiceController.getByName)
router.post("/:userId", ServiceController.post);
router.post("/:id/comment", ServiceController.postComment);
router.put("/:id", ServiceController.update);
router.put("/:userId/:serId", ServiceController.updateUsersAndServices);
router.patch("/:fullname", ServiceController.updateName);
router.delete("/:id", ServiceController.delete);

module.exports = router;
