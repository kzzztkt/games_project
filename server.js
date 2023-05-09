const express = require('express');
const { getCatgories } = require('./controllers/getCatagories.controller');
const app = express();
app.use(express.json());

app.listen(5432, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log('server listening on port 5432');
    }
})




app.get('/api/catagories', getCatgories);


app.use((err, req, res, next) => {
    if(err.code === '42P01'){
        res.send('Table does not exist')
    } else next(err);
})

module.exports = app;