const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    image:{type:String,required:true},
    paragraph:{type:String,required:true},
})


const aboutModel = mongoose.model('aboutModel',aboutSchema,'aboutModel')

module.exports = aboutModel