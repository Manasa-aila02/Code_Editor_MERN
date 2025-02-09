const mongoose = require("mongoose")

const AddUsersSchema = mongoose.Schema({
   name: String,
   email: String,
   password: String,
})

module.exports = mongoose.model("Users", AddUsersSchema);