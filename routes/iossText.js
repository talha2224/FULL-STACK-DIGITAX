const iossTextModel = require('../model/iossTextModel')
const router = require('express').Router()


router.post('/ioss/question',async(req,res)=>{
    let create = await iossTextModel.create(req.body)
    if (create){
        res.status(200).json(create)
    }
})

router.get('/ioss/question/:role',async(req,res)=>{
    let find = await iossTextModel.find({role:req.params.role})
    if (find.length>0){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"NO ABOUT US DATA FOUND"})
    }
})

router.get('/ioss/question/second/:id',async(req,res)=>{
    let {id} = req.params
    let find = await iossTextModel.findById(id)
    if (find){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.put('/ioss/question/:id',async(req,res)=>{
    let {id} = req.params
    let update = await iossTextModel.findByIdAndUpdate(id,{$set:req.body},{new:true})
    if (update){
        res.status(200).json(update)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.delete('/ioss/question/:id',async(req,res)=>{
    let {id} = req.params
    let deleteId = await iossTextModel.findByIdAndDelete(id)
    if (deleteId){
        res.status(200).json({msg:"deleted"})
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

module.exports = router