const db = require('../db');

exports.patchReview = (id, vote) => {
    const queryStr = `
    UPDATE reviews
    SET
    votes = votes + $1
    WHERE 
    review_id = $2
    RETURNING *;`
    const inserts = [Number(vote.inc_vote), Number(id)];

    return db.query(queryStr, inserts).then((result) => {
        return result.rows[0]
    }).catch((err) => {
        return Promise.reject(err)
    })
}