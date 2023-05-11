const db = require('../db')
const format = require('pg-format');


exports.postCommentModel = (id, comment) => {
    const {username, body} = comment;
    if(!username || !body){
        return Promise.reject({status : 400})
    }
    const queryValues = [body, id, username];
    const query = (`INSERT INTO comments
    (body, review_id, author)
    VALUES
    ($1, $2, $3)
    RETURNING *`)
    
    return db.query(query, queryValues).then((result) => {
        return result.rows[0];
    }).catch((err) => {
        return Promise.reject(err)
    })
}