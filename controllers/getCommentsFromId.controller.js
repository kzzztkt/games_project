const { fetchCommentsFromId } = require("../models/fetchCommentsFromId.model")

exports.getCommentsFromId = (req, res, next) => {
 const id = req.params.review_id;
 return fetchCommentsFromId(id).then((result) => {
    res.status(200)
    .send({comments : result.rows});
 }).catch((err) => {
    next(err);
 })
    
}