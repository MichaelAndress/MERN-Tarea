const {
    login,
    register,
    logout,
    verifyToken,
} = require("../controllers/auth.controller");
const { Router } = require("express");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const { validarCamposZod } = require("../middlewares/validaCamposZod");
const { validarAuth } = require("../middlewares/validarAuth");


const router = Router();

router.post("/register", validarCamposZod(registerSchema), register);
router.post("/login", validarCamposZod(loginSchema), login);
router.get("/verify", validarAuth, verifyToken);
// router.post("/verify", validarAuth, logout);


module.exports = router;
