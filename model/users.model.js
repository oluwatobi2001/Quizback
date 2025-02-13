


const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const UserSchema = new Schema({
username: {
    type: String,
    
},

googleId: {
type: String
},
email: {
    type: String,
    required: true
},
password:  {
type: String
},
avatar : {
    type: String
},



createdAt: {
    type : Date,
    default: Date.now()
}}, {timestamps: true})


module.exports = mongoose.model("User", UserSchema)
