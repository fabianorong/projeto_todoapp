const router = require("express").Router();

const TaskController = require("../controllers/TaskController");

//middleware
const verifyToken = require("../helpers/verify-token");

router.post("/create", verifyToken, TaskController.create);
router.get("/mytasks", verifyToken, TaskController.getAllUserTasks);
router.get("/mytasks/:id", verifyToken, TaskController.getTaskById);
router.delete("/mytasks/:id", verifyToken, TaskController.removeTaskById);
router.patch("/mytasks/:id", verifyToken, TaskController.updateTask);
router.patch("/mytasks/conclude/:id", verifyToken, TaskController.concludeTask);

module.exports = router;
