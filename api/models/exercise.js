const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    email: {type:String, required:true},
    difficulty: {type:String, required:true},
    right: {type:Boolean, required:true},
    equation: {type:String, required:true}
})

const Exercise = mongoose.model("exercise",exerciseSchema)

module.exports = Exercise