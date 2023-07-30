const mongoose = require('mongoose');

const iossHeadSchema = new mongoose.Schema({
    role:{type:String,required:true},
    heading:{type:String,required:true},
    paragraph:{type:String,required:true},
})


const iossHeadModel = mongoose.model('iossHeadModel',iossHeadSchema,'iossHeadModel')

module.exports = iossHeadModel