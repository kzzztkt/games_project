const { fetchCatagories } = require("../models/fetchCatagories.model");

exports.getCatgories = (req, res) => {
    fetchCatagories().then((data) => {
        res.status(200)
        .send(data)
    })
}