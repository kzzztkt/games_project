const { fetchCatagories } = require("../models/fetchCatagories.model");

exports.getCatgories = (req, res, next) => {
    return fetchCatagories().then((data) => {
        res.status(200)
        .send(data)
    }).catch((err) => {
       next(err);
   })
}