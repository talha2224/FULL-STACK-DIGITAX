const router = require('express').Router()
const adminAccount = require('../model/admin/accountModel')
const bcrypt = require('bcryptjs');

router.post("/register",async(req,res)=>{
    let {name,email,password} = req.body
    let find = await adminAccount.find({})
    if (find.length>0){
        res.status(400).json({msg:"ADMIN ALREADY FOUND"})
    }
    else{
        let hash = await bcrypt.hash(password,10)
        let create = await adminAccount.create({adminName:name,adminEmail:email,password:hash})
        if (create){
            res.status(200).json(create)
        }
        else{
            res.status(500).json({msg:"FAILED TO CREATE"})
        }
    }
})

router.post("/login",async(req,res)=>{
    let {email,password} = req.body
    let find = await adminAccount.findOne({adminEmail:email})
    if (find){
        let compare = await bcrypt.compare(password,find.password)
        if (compare){
            res.json(find).status(200)
        }
        else{
            res.status(300).json({msg:"INVALID CREDENTIALS"})
        }
    }
    else{
        res.status(404).json({msg:"NO ADMIN FOUND"})
    }
})

module.exports = router