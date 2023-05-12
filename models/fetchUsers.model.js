const db = require('../db');

exports.fetchUsers = () => {
    const querStr = `SELECT * FROM users`
return db.query(querStr).then((result) => {
return result.rows;
})
}