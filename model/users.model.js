


const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate")

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

UserSchema.plugin(findOrCreate)

module.exports = mongoose.model("User", UserSchema)
