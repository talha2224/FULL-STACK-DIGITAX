const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    image:{type:String,required:true},
    heading:{type:String,required:true},
    paragraph:{type:String,required:true},

})


const serviceModel = mongoose.model('serviceModel',serviceSchema,'serviceModel')

module.exports = serviceModel