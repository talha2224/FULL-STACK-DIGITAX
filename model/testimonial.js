const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    image:{type:String,required:true},
    name:{type:String,required:true},
    message:{type:String,required:true}
})


const testimonialModel = mongoose.model('testimonialModel',testimonialSchema,'testimonialModel')

module.exports = testimonialModel