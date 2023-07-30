const mongoose = require('mongoose');

const iossImageSchema = new mongoose.Schema({
    role:{type:String,required:true},
    image:{type:String,required:true},
    question:{type:String,required:true},
    answer:{type:String,required:true},
})


const iossImageModel = mongoose.model('iossImageModel',iossImageSchema,'iossImageModel')

module.exports = iossImageModel