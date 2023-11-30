const db = require('../config/config');

const Citas = {};

Citas.getAll = (result) => {
    const sql = `
    SELECT
        CONVERT(id, char) AS id,
        nombre_mascota,
        raza_mascota, 	
        nombre_propietario, 	
        telefono_propietario, 	
        edad_mascota, 	
        sexo_mascota,	
        fecha_cita, 	
        hora_cita, 	
        razon_cita, 	
        estado_cita, 	
        idusuario 	

    FROM
        tbl_citas
    ORDER BY
        sexo_mascota	
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Citas:', data);
                result(null, data);
            }
        }
    )
}

Citas.getAll = (result) => {
    const sql = `
    SELECT
        CONVERT(id, char) AS id,
        nombre_mascota,
        raza_mascota, 	
        nombre_propietario, 	
        telefono_propietario, 	
        edad_mascota, 	
        sexo_mascota,	
        fecha_cita, 	
        hora_cita, 	
        razon_cita, 	
        estado_cita, 	
        idusuario 	

    FROM
        tbl_citas
    ORDER BY
        hora_cita	
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Citas:', data);
                result(null, data);
            }
        }
    )
}

Citas.getAll = (result) => {
    const sql = `
    SELECT
        CONVERT(id, char) AS id,
        nombre_mascota,
        raza_mascota, 	
        nombre_propietario, 	
        telefono_propietario, 	
        edad_mascota, 	
        sexo_mascota,	
        fecha_cita, 	
        hora_cita, 	
        razon_cita, 	
        estado_cita, 	
        idusuario 	

    FROM
        tbl_citas
    ORDER BY
        razon_cita
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Citas:', data);
                result(null, data);
            }
        }
    )
}



Citas.create = (citas, result) => {

    const sql = `
        INSERT INTO
        tbl_citas(
            nombre_mascota,
            raza_mascota, 	
            nombre_propietario, 	
            telefono_propietario, 	
            edad_mascota, 	
            sexo_mascota,	
            fecha_cita, 	
            hora_cita, 	
            razon_cita, 	
            estado_cita, 	
            idusuario 	
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
            citas.nombre_mascota,
            citas.raza_mascota, 	
            citas.nombre_propietario, 	
            citas.telefono_propietario, 	
            citas.edad_mascota, 	
            citas.sexo_mascota,	
            citas.fecha_cita, 	
            citas.hora_cita, 	
            citas.razon_cita, 	
            citas.estado_cita, 	
            citas.idusuario 	 
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva cita:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}

module.exports = Citas;