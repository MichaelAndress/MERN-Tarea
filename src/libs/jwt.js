const jwt = require('jsonwebtoken');

const crearJWT = ( id, username ) => {

    return new Promise( (resolve, reject) => {

        const payload = { id, username };

        jwt.sign( payload, 'secret123', {
            expiresIn: '2h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        })


    })
}


module.exports = {
    crearJWT
}
