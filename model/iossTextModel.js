const mongoose = require('mongoose');

const iossTextSchema = new mongoose.Schema({
    role:{type:String,required:true},
    question:{type:String,required:true},
    answer:{type:String,required:true},
})



const iossTextModel = mongoose.model('iossTextModel',iossTextSchema,'iossTextModel')

module.exports = iossTextModel