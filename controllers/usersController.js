const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');


module.exports = {

    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {
            
            console.log('Error ', err);
            console.log('USUARIO ', myUser);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({idusuario: myUser.idusuario, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                    idusuario: `${myUser.idusuario}`, 
                    nombre: myUser.nombre,
                    apaterno: myUser.apaterno,
                    amaterno: myUser.amaterno,
                    telefono: myUser.telefono,
                    email: myUser.email,
                    direccion: myUser.direccion,
                    nombre_usuario: myUser.nombre_usuario,
                    idpreguntasecreta: myUser.idpreguntasecreta, 	
                    respuesta: myUser.respuesta,
                    imagen: myUser.imagen,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });

            }
            else {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El password es incorrecto'
                });
            }

        });

    },

    register(req, res) {

        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        User.create(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            });

        });

    },
    async registerWithImage(req, res) {

        const user = JSON.parse(req.body.user); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.imagen = url;
            }
        }

        User.create(user, (err, data) => {

        
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            user.idusuario = `${data}`;
            const token = jwt.sign({idusuario: user.idusuario, email: user.email}, keys.secretOrKey, {});
            user.session_token = `JWT ${token}`

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: user
            });
        });
    },
    getAll(req, res) {
        User.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los usuarios',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    }
}