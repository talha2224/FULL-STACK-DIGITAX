const router = require('express').Router()
const workModel = require('../model/workModel')

router.post('/work',async(req,res)=>{    
    let create = await workModel.create(req.body)
    if (create){
        res.status(200).json(create)
    }
})

router.get('/work',async(req,res)=>{
    let find = await workModel.find({})
    if (find.length>0){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"NO ABOUT US DATA FOUND"})
    }
})

router.get('/work/role/:role',async(req,res)=>{
    let {role} = req.params
    let find = await workModel.find({role:role})
    if (find){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    } 
})

router.get('/work/:id',async(req,res)=>{
    let {id} = req.params
    let find = await workModel.findById(id)
    if (find){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.put('/work/:id',async(req,res)=>{
    let {id} = req.params
    let update = await workModel.findByIdAndUpdate(id,{$set:req.body},{new:true})
    if (update){
        res.status(200).json(update)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.delete('/work/:id',async(req,res)=>{
    let {id} = req.params
    let deleteId = await workModel.findByIdAndDelete(id)
    if (deleteId){
        res.status(200).json({msg:"deleted"})
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})
module.exports = router