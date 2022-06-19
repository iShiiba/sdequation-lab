const mongoose = require('mongoose')

const summarySchema = new mongoose.Schema({
    name: {type:String, require: true},
    email: {type:String, required:true},
    right: {type:Number, required:true},
    wrong: {type:Number, required:true}
})

const Summary = mongoose.model("summary",summarySchema)

module.exports = Summary