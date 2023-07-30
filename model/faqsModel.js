const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    title:{type:String,required:true},
    question:{type:String,required:true},
    answer:{type:String,required:true}
})


const faqModel = mongoose.model('faqModel',faqSchema,'faqModel')

module.exports = faqModel