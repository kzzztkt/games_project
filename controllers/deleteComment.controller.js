const { deleteCommentModel } = require("../models/deleteComment.model")

exports.deleteCommentController = (req, res, next) => {
    deleteCommentModel(req.params.comment_id).then(() => {
        res.status(204)
        .send();
    }).catch((err) => {
        console.log('catch error ' + err);
        next(err);
    })
        

}