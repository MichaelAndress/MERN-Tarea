const { response } = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const { crearJWT } = require('../libs/jwt')

const register = async (req, res = response) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(500).json({
                msg: "Usuario Ya Existe",
            });
        }
        user = new User(req.body);

        // !HASH password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        // !TOKEN
        const token = await crearJWT({id:user.id, usuario:user.username});

        res.cookie('token', token);
        res.json({
            msg: `usuario fue creado exitosamente`,
            token,
            id: user.id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
};

const login = async(req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await User.findOne({ username });
        if (!usuario) {
            return res.status(500).json({
                msg:"Usuario ingresado no existe"
            });
        };
        const validarPass = bcrypt.compareSync(password, usuario.password);
        if (!validarPass) {
            return res.status(400).json({
                msg:"Contraseñas incorrecta"
            })
        };
        const token = await crearJWT({id:usuario.id, usuario:usuario.username});
        res.cookie('token', token);
        res.json({
            ok:true,
            id:usuario.id,
            usuario: username,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
};

const logout =(req, res)=>{
    res.cookie("token","",{
        expires:new Date(0),
    });
    return res.status(200).json({
        msg:'Logout'
    })
}

const verifyToken = async (req, res) => {
      const userFound = await User.findById(req.user.id);
      if (!userFound) return res.status(401).json({
        msg:"fallo"
      });
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
  };

module.exports = {
    login,
    register,
    logout,
    verifyToken,
};