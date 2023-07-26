const {
    getTask,
    getOneTask,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/task.controller");
const { validarToken } = require("../middlewares/validarToken");
const { Router } = require("express");

const router = Router();

router.get("/", validarToken, getTask);
router.get("/:id", validarToken, getOneTask);
router.post("/", validarToken, createTask);
router.delete("/:id", validarToken, deleteTask);
router.put("/:id", validarToken, updateTask);

module.exports = router;
