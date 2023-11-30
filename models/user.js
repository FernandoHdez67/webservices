const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.getAll = (result) => {
    const sql = `
    SELECT
        CONVERT(idusuario, char) AS idusuario,
        nombre,
        apaterno,
        amaterno,
        telefono,
        email,
        direccion,
        nombre_usuario,
        idpreguntasecreta, 	
        respuesta,
        password,
        imagen 
    FROM
        tbl_usuarios
    ORDER BY
        idpreguntasecreta
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuarios:', data);
                result(null, data);
            }
        }
    )
}

User.findById = (idusuario, result)=>{
    const sql = `
        SELECT
            idusuario,
            nombre,
            apaterno,
            amaterno,
            telefono,
            email,
            direccion,
            nombre_usuario,
            idpreguntasecreta, 	
            respuesta,
            password,
            imagen 
        FROM
            tbl_usuarios
        WHERE
            idusuario = ?

    `;
    db.query(
        sql,
        [idusuario],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:',  user[0]);
                result(null,  user[0]);
            }
        }
    )
}

User.findByEmail = (email, result) => {

    const sql = `
    SELECT
        idusuario,
        nombre,
        apaterno,
        amaterno,
        telefono,
        email,
        direccion,
        nombre_usuario,
        idpreguntasecreta, 	
        respuesta,
        password,
        imagen 
    FROM
        tbl_usuarios
    WHERE
        email = ?
    `;

    db.query(
        sql,
        [email],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}

User.create = async (user, result) => {

    const hash = await bcrypt.hash(user. password, 10);

    const sql = `
        INSERT INTO
        tbl_usuarios(
            nombre,
            apaterno,
            amaterno,
            telefono,
            email,
            direccion,
            nombre_usuario,
            idpreguntasecreta, 	
            respuesta,
            password,
            imagen 	
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    db.query
    (
        sql,
        [
            user.nombre,
            user.apaterno,
            user.amaterno,
            user.telefono,
            user.email,
            user.direccion,
            user.nombre_usuario,
            user.idpreguntasecreta, 	
            user.respuesta,
            hash,
            user.imagen 
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}

module.exports = User;