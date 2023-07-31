const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarAuth = ( req, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { id, username } = jwt.verify(
            token,
            'secret123'
        );

        req.id = id;
        req.username = username;
        // console.log(req.id)


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }



    next();
}


module.exports={
  validarAuth
}