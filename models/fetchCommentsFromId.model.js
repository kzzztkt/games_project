const db = require('../db');
exports.fetchCommentsFromId = (id) => {
    if(!/[\d]/.test(id)){
        return Promise.reject({status: 400})
    }
return db.query(
    `SELECT * FROM comments
     WHERE review_id = $1;`,
     [id]
)}