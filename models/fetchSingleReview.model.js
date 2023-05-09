const db = require('../db')


exports.fetchSingleReview = (id) => {
    const arr = [id];
    let queryString = `SELECT * FROM reviews WHERE review_id = $1;`
    return db.query(queryString, arr).then((result) => {
        return result.rows;
    })
}