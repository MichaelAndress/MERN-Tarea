const { login, register, logout, verifyToken } = require("../controllers/auth.controller");
const { Router } = require("express");
const { body } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarToken } = require("../middlewares/validarToken")

const router = Router();

router.post(
    "/register",
    [
        body("username", "el nombre es obligatorio")
            .not()
            .isEmpty()
            .isLength({ min: 4 }),
        body("email", "Email obligatorio").isEmpty().isEmail().normalizeEmail(),
        body("password", "Password debe ser mayor a 4")
            .isEmpty()
            .isLength({ min: 4 }),
    ],
    register
);
router.post("/login", login);
router.post("/logout", validarToken, logout);
router.get("/profile", validarToken, verifyToken);

module.exports = router;
