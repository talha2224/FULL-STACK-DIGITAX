const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    paragraph1:{type:String},
    heading:{type:String},
    paragraph2:{type:String},
    email:{type:String},
    phone:{type:String},
    address:{type:String},
})


const ContactModel = mongoose.model('ContactModel',contactSchema,'ContactModel')

module.exports = ContactModel