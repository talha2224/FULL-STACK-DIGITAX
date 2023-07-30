const router = require('express').Router()
const iossHeadModel = require('../model/iossTopModel')

router.post('/ioss/text',async(req,res)=>{
    let create = await iossHeadModel.create(req.body)
    if (create){
        res.status(200).json(create)
    }
})

router.get('/ioss/text/:role',async(req,res)=>{
    let {role} = req.params
    let find = await iossHeadModel.find({role:role})
    if (find.length>0){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"NO ABOUT US DATA FOUND"})
    }
})

router.get('/ioss/top/text/:id',async(req,res)=>{
    let {id} = req.params
    let find = await iossHeadModel.findById(id)
    if (find){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.put('/ioss/text/:id',async(req,res)=>{
    let {id} = req.params
    let update = await iossHeadModel.findByIdAndUpdate(id,{$set:req.body},{new:true})
    if (update){
        res.status(200).json(update)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.delete('/ioss/text/:id',async(req,res)=>{
    let {id} = req.params
    let deleteId = await iossHeadModel.findByIdAndDelete(id)
    if (deleteId){
        res.status(200).json({msg:"deleted"})
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

module.exports = router