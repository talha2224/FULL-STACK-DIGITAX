const router = require('express').Router()
const homeModel = require('../model/homeModel')

router.post('/home',async(req,res)=>{
    let create = await homeModel.create(req.body)
    if (create){
        res.status(200).json(create)
    }
})

router.get('/home',async(req,res)=>{
    let find = await homeModel.find({})
    if (find.length>0){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"NO ABOUT US DATA FOUND"})
    }
})

router.get('/home/:id',async(req,res)=>{
    let {id} = req.params
    let find = await homeModel.findById(id)
    if (find){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.put('/home/:id',async(req,res)=>{
    let {id} = req.params
    let update = await homeModel.findByIdAndUpdate(id,{$set:req.body},{new:true})
    if (update){
        res.status(200).json(update)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.delete('/home/:id',async(req,res)=>{
    let {id} = req.params
    let deleteId = await homeModel.findByIdAndDelete(id)
    if (deleteId){
        res.status(200).json({msg:"deleted"})
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})
module.exports = router