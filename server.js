const express = require('express');
const { getCatgories } = require('./controllers/getCategories.controller');
const { getEndpoints } = require('./controllers/getEndpoints.controller');
const { getSingleReview } = require('./controllers/getSingleReview.controller');
const { getReviews } = require('./controllers/getReviews.controller');
const app = express();

app.use(express.json());

app.get('/api', getEndpoints);
app.get('/api/categories', getCatgories);
app.get('/api/reviews/:review_id', getSingleReview);
app.get('/api/reviews', getReviews);

app.use('/*', (req, res) => {
        res.status(404).send({message:'404 path not found'})
})

module.exports = app;