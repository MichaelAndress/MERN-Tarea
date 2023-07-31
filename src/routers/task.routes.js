const {
    getTask,
    getOneTask,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/task.controller");
const { Router } = require("express");
const { validarCamposZod } = require("../middlewares/validaCamposZod");
const { validarAuth } = require("../middlewares/validarAuth");
const { crearTaskSchema } = require("../schemas/task.schema");

const router = Router();

router.get("/",validarAuth, getTask);
router.get("/:id", validarAuth, getOneTask);
router.post("/", validarAuth, createTask);
router.delete("/:id", validarAuth, validarCamposZod(crearTaskSchema), deleteTask);
router.put("/:id", validarAuth, updateTask);

module.exports = router;
