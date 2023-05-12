const db = require('../db')

exports.deleteCommentModel = (comment_id) => {
   return db.query(`SELECT * FROM comments WHERE comment_id = $1;`, [comment_id]).then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 404})
        } 
    }).then(() => {
        return db.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id])
        
    }).then(() => {
        return Promise.resolve('Deleted')
})
}
