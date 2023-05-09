const express = require('express');
const { getCatgories } = require('./controllers/getCatagories.controller');
const app = express();

app.use(express.json());

app.get('/api/catagories', getCatgories);

app.use('/*', (req, res) => {
        res.status(404).send({message:'404 path not found'})
})

module.exports = app;