const db = require('../db')
const format = require('pg-format');


exports.postCommentModel = (id, comment) => {
    // console.log(id);

    const {username, body} = comment;

    const queryValues = [body, id, username];

    const query = (`INSERT INTO comments
    (body, review_id, author)
    VALUES
    ($1, $2, $3)
    RETURNING *`)
 
    return db.query(query, queryValues).then((result) => {
        return result.rows[0];
    }).catch((err) => {
        console.log(err);
    })

}