const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { crearJWT } = require("../libs/jwt");

const register = async (req, res = response) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(500).json({
                message: "Usuario Ya Existe",
            });
        }
        user = new User(req.body);

        // !HASH password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        // !TOKEN
        const token = await crearJWT({ id: user.id, username: user.username });

        res.cookie("token", token);
        res.json({
            message: `usuario fue creado exitosamente`,
            token,
            id: user.id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await User.findOne({ username });
        if (!usuario) {
            return res.status(500).json({
                message: "Usuario ingresado no existe",
            });
        }
        const validarPass = bcrypt.compareSync(password, usuario.password);
        if (!validarPass) {
            return res.status(400).json({
                message: "Contraseñas incorrecta",
            });
        }
        const token = await crearJWT({
            id: usuario.id,
            username: usuario.username,
        });
        res.cookie("token", token);
        res.json({
            ok: true,
            id: usuario.id,
            username: username,
            token,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};


const verifyToken = async (req, res) => {
    const { id, username } = req;
    try {
        const token = await crearJWT(id, username);
    
        res.json({
            ok: true,
            id:id.id,
            username:id.username,
            token,
        });
        
    } catch (error) {
        console.log('fallo en verify')
        console.log(error)    
    }
};

module.exports = {
    login,
    register,
    verifyToken,
};
