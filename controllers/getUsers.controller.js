const { fetchUsers } = require("../models/fetchUsers.model")

exports.getUsers =(req, res) => {
fetchUsers().then((result) => {
    res.status(200)
    .send({users:result});
})
  

}