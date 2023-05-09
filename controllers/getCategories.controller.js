const { fetchCategories } = require("../models/fetchCategories.model");

exports.getCatgories = (req, res, next) => {
    return fetchCategories().then((data) => {
        res.status(200)
        .send(data)
    }).catch((err) => {
       next(err);
   })
}