const { fetchCommentsFromId } = require("../models/fetchCommentsFromId.model")

exports.getCommentsFromId = (req, res, next) => {
 const id = req.params.review_id;
 return fetchCommentsFromId(id).then((result) => {
   if(result.rows.length === 0){
      return Promise.reject({status: 404})
   }
    res.status(200)
    .send({comments : result.rows});
 }).catch((err) => {
    next(err);
 })
    
}