const { fetchEndpoints } = require("../models/fetchEndpoints.model")
const endpointsJSON = require ('../endpoints.json')

exports.getEndpoints = (req, res, next) => {
    res.status(200)
    .send(fetchEndpoints());
}