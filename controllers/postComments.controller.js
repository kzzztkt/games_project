const { postCommentModel } = require("../models/postComments.model")

exports.postCommentController = (req, res, next) => {
    const { review_id } = req.params;
    const comment = req.body;
    return postCommentModel(review_id, comment).then((result) => {
        res.status(201)
        .send({ comment: result });
    }).catch((err) => {
        next(err);
    })
}