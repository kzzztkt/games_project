const { fetchSingleReview } = require("../models/fetchSingleReview.model")

exports.getSingleReview = (req, res, next) => {
    const id = req.params.review_id;
    return fetchSingleReview(id).then((result) => {
        // console.log(result[0]);
        res.status(200)
        .send(result[0])
    }).catch((err) => {
        next(err);
    })
}