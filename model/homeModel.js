const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    title1:{type:String,required:true},
    vate:{type:String,required:true},
    paragraph1:{type:String,required:true},
    affilate:{type:String},
    title2:{type:String},
    paragraph2:{type:String,required:true},

})


const homeModel = mongoose.model('homeModel',homeSchema,'homeModel')

module.exports = homeModel