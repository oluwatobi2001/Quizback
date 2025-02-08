


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
    type: String
},
password:  {
type: String
},
avatar : {

},



createdAt: {
    type : Date,
    default: Date.now()
}}, {timestamps: true})


module.exports = mongoose.model("User", UserSchema)
