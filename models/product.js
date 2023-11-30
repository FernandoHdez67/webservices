const db = require('../config/config');

const Product = {};

Product.findByCategory = (id_category, result) => {
    const sql = `
    SELECT
        CONVERT(P.id, char) AS id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.image4,
        P.image5,
        P.image6,
        CONVERT(P.id_category, char) AS id_category
    FROM
        products as P
    WHERE 
        P.id_category = ?
    `;

    db.query(
        sql,
        [id_category],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo producto:', res);
                result(null, res);
            }
        }
    );
}

Product.findByNameAndCategory = (name, id_category, result) => {
    const sql = `
    SELECT
        CONVERT(P.id, char) AS id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.image4,
        P.image5,
        P.image6,
        CONVERT(P.id_category, char) AS id_category
    FROM
        products as P
    WHERE 
        P.id_category = ? AND LOWER(P.name) LIKE ?
    `;

    db.query(
        sql,
        [
            id_category,
            `%${name.toLowerCase()}%`
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo producto:', res);
                result(null, res);
            }
        }
    );
}

Product.create = (product, result) => {

    const sql = `
    INSERT INTO
        products(
            name,
            description,
            price,
            image1,
            image2,
            image3,
            image4,
            image5,
            image6,
            id_category 
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.image4,
            product.image5,
            product.image6,
            product.id_category,
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo producto:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Product.update = (product, result) => {

    const sql = `
    UPDATE
        products
    SET
        name = ?,
        description = ?,
        price = ?,
        image1 = ?,
        image2 = ?,
        image3 = ?,
        image4 = ?,
        image5 = ?,
        image6 = ?,
        id_category = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.image4,
            product.image5,
            product.image6,
            product.id_category,
            product.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del producto actualizado:', product.id);
                result(null, product.id);
            }
        }

    )

}


module.exports = Product;