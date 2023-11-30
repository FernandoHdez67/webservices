const Cita = require('../models/citas');

module.exports = {

    register(req, res) {

        const cita = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        Cita.create(cita, (err, data) => {

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
                data: data // EL ID DE LA NUEVA CITA DEL USUARIO 
            });

        });

    },
    getAll(req, res) {
        Cita.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las citas',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    }

}