const app = require('./server')
const PORT = 5432;

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log('server listening on port ${PORT}');
    }
})