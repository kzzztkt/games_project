const { patchReview } = require("../models/patchReview.model")

exports.patchReviewController = (req, res, next) => {
    const { review_id } = req.params;
    const vote = req.body;
    return patchReview(review_id, vote).then((result)  => {
        if(result === undefined){
            res.status(404)
            .send({message: 'Resource not found'})
        }
        res.status(200)
        .send({review : result });
    }).catch((err) => {
        next(err);
    })
}