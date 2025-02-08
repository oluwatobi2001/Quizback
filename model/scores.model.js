


const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const ScoreSchema = new Schema({
user: {
    type: String,
    required:true,
    
},

scoreDetail: {
    type: Number,
required: true
}, 

createdAt: {
    type : Date,
    default: Date.now()
}}, {timestamps: true})


module.exports = mongoose.model("Score", ScoreSchema)
