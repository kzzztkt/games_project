const db = require('../db');

exports.fetchReviews = () => {
    const querStr = `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY created_at;`
return db.query(querStr).then((result) => {
return result.rows;
})
}