const { fetchReviews } = require("../models/fetchReviews.model")

exports.getReviews =(req, res) => {
fetchReviews().then((result) => {
    res.status(200)
    .send({reviews:result});
})
  

}