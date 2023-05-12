const { fetchUsers } = require("../models/fetchUsers.model")

exports.getUsers =(req, res, next) => {
fetchUsers().then((result) => {
    res.status(200)
    .send({users:result});
}).catcn((err) => {
    next(err)
})
  

}