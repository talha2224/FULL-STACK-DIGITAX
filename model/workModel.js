const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    role:{type:String,required:true},
    paragraph:{type:String,required:true}
})


const workModel = mongoose.model('workModel',workSchema,'workModel')

module.exports = workModel