const citassController = require('../controllers/citasControllers');
const passport = require('passport');

module.exports = (app, upload) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS
    app.post('/api/citas/create', citassController.register);
    app.get('/api/citas/getAll',  passport.authenticate('jwt', { session: false }), citassController.getAll);
}