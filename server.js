const express = require('express');
const { getCatgories } = require('./controllers/getCategories.controller');
const { getEndpoints } = require('./controllers/getEndpoints.controller');
const { getSingleReview } = require('./controllers/getSingleReview.controller');
const { getReviews } = require('./controllers/getReviews.controller');
const { getCommentsFromId } = require('./controllers/getCommentsFromId.controller');
const { postCommentController } = require('./controllers/postComments.controller');
const { patchReviewController } = require('./controllers/patchReview.controller');
const app = express();

app.use(express.json());

app.get('/api', getEndpoints);
app.get('/api/categories', getCatgories);
app.get('/api/reviews/:review_id', getSingleReview);
app.get('/api/reviews', getReviews);
app.get('/api/reviews/:review_id/comments', getCommentsFromId);
app.post('/api/reviews/:review_id/comments', postCommentController)
app.patch('/api/reviews/:review_id', patchReviewController);

app.use('/*', (req, res) => {
        res.status(404).send({message:'404 path not found'})
})

app.use((err, req, res, next) => {
        if(err.status === 400){
        res.status(400).send({message: 'Bad request'});
        }   
        if(err.status === 404){
        res.status(404).send({message: 'Resource not found'});
        }   
        if(err.code === '22P02'){
        res.status(400).send({message: 'Invalid input type'});
        } 
        if(err.code ==='23503'){
        res.status(404).send({message: 'Resource not found'});       
        }
})

module.exports = app;