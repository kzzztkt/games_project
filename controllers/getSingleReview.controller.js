const { fetchSingleReview } = require("../models/fetchSingleReview.model")

exports.getSingleReview = (req, res, next) => {
    const id = req.params.review_id;
    return fetchSingleReview(id).then((result) => {
        if(result[0] === undefined){
            res.status(404)
            .send({message: '404 not found'})
        }
        res.status(200)
        .send(result[0])
    }).catch((err) => {
        next(err);
    })
}