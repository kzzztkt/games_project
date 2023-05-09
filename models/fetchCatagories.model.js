const db = require('../db')

exports.fetchCatagories = () => {
    return db.query('SELECT * FROM categories;').then((data) => {
        return data.rows;
    })
}