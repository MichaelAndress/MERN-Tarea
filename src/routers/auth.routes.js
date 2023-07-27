const {
    login,
    register,
    logout,
} = require("../controllers/auth.controller");
const { Router } = require("express");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const { validarCamposZod } = require("../middlewares/validaCamposZod");
const { validarAuth } = require("../middlewares/validarAuth");


const router = Router();

router.post("/register", validarCamposZod(registerSchema), register);
router.post("/login", validarCamposZod(loginSchema), login);
router.post("/logout", validarAuth, logout);

module.exports = router;
