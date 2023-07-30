const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    adminName:{
        type:String,
        required:true
    },
    adminEmail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const adminAccount = mongoose.model("adminAccount",accountSchema,"adminAccount")

module.exports = adminAccount